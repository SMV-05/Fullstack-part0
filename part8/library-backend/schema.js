const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_KEY_FOR_LIBRARY'

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}

      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          return []
        }
        filter.author = author._id
      }

      return Book.find(filter).populate('author')
    },
    allAuthors: async () => {
      // Optimización para evitar problema N+1 (Ejercicio 8.26)
      const authors = await Author.find({}).populate('books')
      return authors.map((author) => ({
        name: author.name,
        born: author.born,
        id: author._id,
        bookCount: author.books.length,
      }))
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }

      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author, books: [] })
          await author.save()
        }

        const book = new Book({ ...args, author: author._id })
        await book.save()

        author.books = author.books.concat(book._id)
        await author.save()

        const populatedBook = await Book.findById(book._id).populate('author')

        // Publicar evento para suscripción (Ejercicios 8.23 - 8.25)
        pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

        return populatedBook
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      try {
        await author.save()
        const booksCount = await Book.countDocuments({ author: author._id })
        return {
          name: author.name,
          born: author.born,
          id: author._id,
          bookCount: booksCount,
        }
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      // Para los ejercicios de FSO se valida que el password sea 'secret' o similar
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = { typeDefs, resolvers, JWT_SECRET }
