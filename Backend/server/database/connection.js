const mongoose = require('mongoose')
const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost/argentBankDB'

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Database successfully connected')
    console.log('Connected to:', databaseUrl.replace(/\/\/.*@/, '//***:***@')) 
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}
