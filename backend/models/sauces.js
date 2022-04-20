// Chargement de mongoose
const mongoose = require("mongoose");

// MODELE DES DONNEES REQUISES POUR UN OBJET SAUCE
const sauceSchema = mongoose.Schema({
    userId: { type: String, require:true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true},
    imageUrl: { type: String, required: true },
    heat: { type: Number, min: 1, max: 10, required: true },
    likes: { type: Number, default: 0},
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: Array},
    usersDisliked: { type: Array}
});
// Permet l'utilisation du schema en model    
module.exports = mongoose.model('Sauce', sauceSchema);