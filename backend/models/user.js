// Chargement de mongoose
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');
// Schema de donnée user defini par la fonction schema de mongoose
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
// Application du plugin uniquevalidator au schema
userSchema.plugin(uniqueValidator);
// Permet l'utilisation du schema en model
module.exports = mongoose.model('user', userSchema);