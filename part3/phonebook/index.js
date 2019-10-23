const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const morgan = require('morgan')
morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan((tokens, req, res) => {
  const strings = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ]
  if (req.method === 'POST') strings.push(tokens['data'](req, res))
  
  return strings.join(' ')
}))

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const entriesCount = persons.length
  const timeOfReq = new Date()
  const html = `
    <p>Phonebook has info for ${entriesCount} people</p>
    <p>${timeOfReq}</p>
  `

  res.send(html)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  
  res.status(204).end()
})

const ONE_MILLION = 1000000000 // not in a million years
const generateId = () => Math.floor(Math.random() * ONE_MILLION)

app.post('/api/persons', (req, res) => {
  const body = req.body

  const errors = []
  if (!body.name) {
    errors.push('name is missing')
  } else if (persons.find(p => p.name === body.name)) {
    errors.push('name must be unique')
  }
  if (!body.number) errors.push('number is missing')

  if (errors.length > 0) {
    return res.status(400).json({
      error: errors.join(' & ')
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})