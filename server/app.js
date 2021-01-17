// Enable babel transpiler
require('@babel/register')

require('dotenv').config()

// Import dependencies
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')

// Connect MongoDB
const mongoose = require('mongoose')

// Import config
const config = require('./../config.js')

const MONGODB_URI = config.mongoDBUri || 'mongodb://localhost/fullstack-express-react-mongodb-app'

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})

mongoose.connection.on('connected', () => console.log('Connected to MongoDB.'))

mongoose.connection.on('error', (err) => console.log(err))

// Import routes
// const homeRoute = require('./routes/')
// const podcastsRoute = require('./routes/')
// const episodesRoute = require('./routes/')
// const usersRoute = require('./routes/')

// Setup app
const PORT = process.env.PORT || '5000'
const app = express()

// Apply middleware
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(helmet())

app.use(express.static(path.join(__dirname, '../build')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')

    return res.status(200).json({})
  }

  next()
})

// app.use('/api/', home)
// app.use('/api/podcasts', podcasts)
// app.use('/api/episodes', episodes)
// app.use('/api/users', users)

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'))
// })

app.listen(PORT, () => {
  console.log('Server started on port', PORT)
})
