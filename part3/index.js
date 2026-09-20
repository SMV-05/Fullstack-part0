require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

// Configuración de morgan con token personalizado para registrar el cuerpo del POST (Ejercicios 3.7 y 3.8)
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const useMongo = Boolean(process.env.MONGODB_URI)
let Person = null

if (useMongo) {
  Person = require('./models/person')
} else {
  console.log('Notice: MONGODB_URI is not set in .env. Running in in-memory mode for local testing.')
}

let initialPersons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' },
]

// Validación auxiliar para modo en memoria (Ejercicios 3.19 y 3.20)
const validatePersonData = (name, number) => {
  if (!name || !number) {
    return 'name or number is missing'
  }
  if (name.length < 3) {
    return 'Name must be at least 3 characters long'
  }
  if (number.length < 8) {
    return 'Number must have at least 8 characters'
  }
  if (!/^\d{2,3}-\d+$/.test(number)) {
    return 'Number format must be XX-XXXXXXX or XXX-XXXXXXX'
  }
  return null
}

// Ejercicio 3.1 & 3.13: Obtener todas las personas
app.get('/api/persons', (req, res, next) => {
  if (useMongo) {
    Person.find({})
      .then(persons => res.json(persons))
      .catch(error => next(error))
  } else {
    res.json(initialPersons)
  }
})

// Ejercicio 3.2 & 3.18: Información de la agenda
app.get('/info', (req, res, next) => {
  if (useMongo) {
    Person.countDocuments({})
      .then(count => {
        res.send(`
          <p>Phonebook has info for ${count} people</p>
          <p>${new Date()}</p>
        `)
      })
      .catch(error => next(error))
  } else {
    res.send(`
      <p>Phonebook has info for ${initialPersons.length} people</p>
      <p>${new Date()}</p>
    `)
  }
})

// Ejercicio 3.3 & 3.18: Obtener persona individual por ID
app.get('/api/persons/:id', (req, res, next) => {
  if (useMongo) {
    Person.findById(req.params.id)
      .then(person => {
        if (person) {
          res.json(person)
        } else {
          res.status(404).end()
        }
      })
      .catch(error => next(error))
  } else {
    const person = initialPersons.find(p => String(p.id) === String(req.params.id))
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }
})

// Ejercicio 3.4 & 3.15: Eliminar persona por ID
app.delete('/api/persons/:id', (req, res, next) => {
  if (useMongo) {
    Person.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).end()
      })
      .catch(error => next(error))
  } else {
    initialPersons = initialPersons.filter(p => String(p.id) !== String(req.params.id))
    res.status(204).end()
  }
})

// Ejercicio 3.5, 3.6, 3.14, 3.19, 3.20: Agregar persona con validaciones
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (useMongo) {
    if (!body.name || !body.number) {
      return res.status(400).json({ error: 'name or number is missing' })
    }

    const person = new Person({
      name: body.name.trim(),
      number: body.number.trim(),
    })

    person.save()
      .then(savedPerson => {
        res.status(201).json(savedPerson)
      })
      .catch(error => next(error))
  } else {
    const validationError = validatePersonData(body.name?.trim(), body.number?.trim())
    if (validationError) {
      return res.status(400).json({ error: validationError })
    }

    const nameExists = initialPersons.some(
      p => p.name.trim().toLowerCase() === body.name.trim().toLowerCase()
    )
    if (nameExists) {
      return res.status(400).json({ error: 'name must be unique' })
    }

    const newPerson = {
      id: String(Math.floor(Math.random() * 1000000000)),
      name: body.name.trim(),
      number: body.number.trim(),
    }

    initialPersons = initialPersons.concat(newPerson)
    res.status(201).json(newPerson)
  }
})

// Ejercicio 3.17: Actualizar número de teléfono existente
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  if (useMongo) {
    Person.findByIdAndUpdate(
      req.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query' }
    )
      .then(updatedPerson => {
        if (updatedPerson) {
          res.json(updatedPerson)
        } else {
          res.status(404).end()
        }
      })
      .catch(error => next(error))
  } else {
    const validationError = validatePersonData(name?.trim(), number?.trim())
    if (validationError) {
      return res.status(400).json({ error: validationError })
    }

    const index = initialPersons.findIndex(p => String(p.id) === String(req.params.id))
    if (index === -1) {
      return res.status(404).end()
    }

    const updated = { ...initialPersons[index], name: name.trim(), number: number.trim() }
    initialPersons[index] = updated
    res.json(updated)
  }
})

// Middleware para rutas desconocidas
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Ejercicio 3.16: Middleware centralizado de manejo de errores
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
