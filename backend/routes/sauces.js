// Chargement express
const express = require('express');
// Permet d'enregistrer des routes pour acceder aux middleware
const router = express.Router();
// Chargement du fichier afin de l'utiliser
const auth = require('../middleware/auth');
// Chargement du fichier afin de l'utiliser
const multer = require('../middleware/multer-config');
// Chargement du fichier afin de l'utiliser
const saucesCtrl = require('../controllers/sauces');

// ROUTE POUR REQUETER SUR TOUTES LES SAUCES  EN IDENTIFIANT L UTILISATEUR
router.get('/', auth, saucesCtrl.getAllSauce);
// ROUTE POUR REQUETER SUR UNE SAUCE EN IDENTIFIANT L UTILISATEUR
router.get('/:id', auth, saucesCtrl.getOneSauce);
// ROUTE POUR POSTER UNE SAUCE QUI NE POURRA ETRE MODIFIER QUE PAR SONT CREATEUR , PREND EN CHARGE LES IMAGES
router.post('/', auth, multer, saucesCtrl.createSauce);
// ROUTE POUR METTRE A JOUR UNE SAUCE QUE SONT UTILISATEUR A CREER
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
// ROUTE POUR SUPPRIMER UNE SAUCE QUE L UTILISATEUR A CREER AINSI QUE SON IMAGE
router.delete('/:id', auth, saucesCtrl.deleteSauce);
// ROUTE POUR LES LIKES
router.post('/:id/like', auth, saucesCtrl.likeSauce);



module.exports = router;