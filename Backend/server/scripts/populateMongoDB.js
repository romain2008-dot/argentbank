const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config()

// Modèle utilisateur
const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    userName: String
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

// Données utilisateurs fixes
const users = [
  {
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'tony@stark.com',
    password: 'password123',
    userName: 'Iron'
  },
  {
    firstName: 'Steve',
    lastName: 'Rogers',
    email: 'steve@rogers.com',
    password: 'password456',
    userName: 'Captain'
  }
]

async function populateDatabase() {
  try {
    // Connexion à MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/argentbank')
    console.log('✅ Connecté à MongoDB Atlas')

    // Supprimer les utilisateurs existants
    await User.deleteMany({})
    console.log('🗑️ Anciens utilisateurs supprimés')

    // Ajouter les nouveaux utilisateurs avec mots de passe hashés
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10)
      
      const user = new User({
        ...userData,
        password: hashedPassword
      })
      
      await user.save()
      console.log(`✅ Utilisateur créé : ${userData.firstName} ${userData.lastName}`)
    }

    console.log('\n🎉 Base de données peuplée avec succès !')
    console.log('\n📋 Utilisateurs disponibles :')
    console.log('Tony Stark - Email : tony@stark.com - Mot de passe : password123')
    console.log('Steve Rogers - Email : steve@rogers.com - Mot de passe : password456')

  } catch (error) {
    console.error('❌ Erreur :', error)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Déconnecté de MongoDB')
  }
}

// Exécuter le script
populateDatabase() 