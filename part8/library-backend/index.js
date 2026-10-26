const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()

const User = require('./models/user')
const { typeDefs, resolvers, JWT_SECRET } = require('./schema')

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/libraryApp'

mongoose.set('strictQuery', false)

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
    })
}

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          try {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
          } catch {
            return {}
          }
        }
        return {}
      },
    })
  )

  const PORT = process.env.PORT || 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()
