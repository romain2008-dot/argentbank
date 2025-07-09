const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const path = require('path')
// Corriger le chemin du swagger pour la production
const swaggerPath = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, '../swagger.yaml')
  : '../swagger.yaml'
const swaggerDocs = yaml.load(swaggerPath)
const dbConnection = require('./database/connection')

dotEnv.config()

const app = express()
const PORT = process.env.PORT || 10000

// Connect to the database
console.log('Attempting to connect to database...')
dbConnection()
console.log('Database connection initiated')

// Handle CORS issues
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}))

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle custom routes
app.use('/api/v1/user', require('./routes/userRoutes'))

// API Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('/', (req, res, next) => {
  res.send('Hello from my Express server v2!')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
  console.log(`CORS Origin: ${process.env.CORS_ORIGIN}`)
})
