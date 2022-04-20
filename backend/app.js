// Chargement du framework express qui utilise NOde afin de facilité la création et la gestion des serveurs Node (logiciel qui permet d'ecrire toutes les taches coté serveur en javascript)
const express = require('express');
// Variable app afin d'utiliser express
const app = express();
// Chargement de la base de données mongoose
const mongoose = require('mongoose');
// Donne acces aux chemins du systeme de fichier
const path = require('path');

// Chargement du fichier contenant les variables d'env
const dotenv = require('dotenv');
const result = dotenv.config();

// Chargement des routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

// Connection à la base de données mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASS}@cluster0.zwtg3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
// exécute express
app.use(express.json());

// CORS partage des ressources entre origines multiple, permet d'ajouter des en-têtes HTTP afin de permettre à un agent utilisateur d'accéder à des ressources d'un serveur situé sur une autre origine que le site courant.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});  

// Remplis le dossier images avec les images qu'on lui envoie via le chemin /images et 
// (static permet de diffuser des images dans le dossier images)
// (path.join permet de joindre les segments de chemin sans connaitre le chemin exacte)
// __dirname renvoie le chemin du répertoire du module (courant ou repertoire de travail)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Execute les middlewares sauces
app.use('/api/sauces', saucesRoutes);

// Execute les middleswares d'authentications signup et login
app.use('/api/auth', userRoutes);


module.exports = app;