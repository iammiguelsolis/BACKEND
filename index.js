const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('./loggerMiddleware')
const Note = require('./models/note') // <-- Importamos el modelo

// Conexión a MongoDB
const connectionString = process.env.MONGODB_URI

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(error => console.error('❌ Error:', error.message))

const app = express()

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type']
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(logger)

// RUTAS

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// GET todas las notas
app.get('/api/notes', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

// GET una nota por ID
app.get('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    if (note) res.json(note)
    else res.status(404).end()
  } catch (error) {
    res.status(400).json({ error: 'malformatted id' })
  }
})

// DELETE una nota por ID
app.delete('/api/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: 'malformatted id' })
  }
})

// POST nueva nota
app.post('/api/notes', async (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ error: 'content missing' })
  }

  const newNote = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  const savedNote = await newNote.save()
  res.status(201).json(savedNote)
})

// Middleware para endpoints desconocidos
app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})

// Iniciar servidor
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})