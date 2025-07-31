const express = require('express')
const cors = require('cors')
const serverless = require('serverless-http')
const logger = require('./loggerMiddleware') // sube un nivel

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

let notes = [
  {
    id: 1,
    content: 'HTML > JAVA',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'HELLO WORLD',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GG SYDA',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello from Vercel</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) res.json(note)
  else res.status(404).end()
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body
  if (!note || !note.content) {
    return res.status(400).json({ error: 'content missing' })
  }
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  const newNote = { ...note, id: maxId + 1 }
  notes = [...notes, newNote]
  res.json(newNote)
})

app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})

// Exporta como función serverless
module.exports = serverless(app)
