// Chargement express
const express = require('express');
// Permet d'enregistrer des routes pour acceder aux middleware
const router = express.Router();
// Chargement du fichier controllers/user
const userCtrl = require('../controllers/user');
// Definition de la route signup et execute le middleware signup 
router.post('/signup', userCtrl.signup);
// Définition de la route login et execute le middleware login
router.post('/login', userCtrl.login);

module.exports = router;