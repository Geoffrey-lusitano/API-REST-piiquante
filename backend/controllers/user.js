// Utilisation de l'algorithme de hachage Eksblowfish unidirectionnel (impossible de retrouver le mdp sans le sel + la clé + les passes que lalgo a utilisé)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//enregistrement de nouveau utilisateurs
// exports.signup = (req, res, next) => {
//     // haché MDP
//     bcrypt.hash(req.body.password, 10)
//         .then(hash => {
//             const user = new User({
//                 email: req.body.email,
//                 password: hash
//             });
//             user.save()
//                 .then(() => res.status(201).json({ message: 'Compte créé !'})) 
//                 .catch(error => res.status(400).json({ error}));
//         })
//         .catch(error => res.status(501).json({ error}));
// };

exports.signup = async (req, res, next) => {
    // haché MDP
    try {
        // remplis la variable hashPassword avec un hash avec les données saisi dans password par l user
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        //console.log(hashPassword);
        //créé le nouvel user sous forme d'objet avec 2 valeurs
        const user = new User ({email: req.body.email, password: hashPassword});
        // sauvegarde dans la base de données
        await user.save();
        res.status(201).json({ message: 'Compte créé !'});
    } catch (error) {
        res.status(400).json({ error});
    }
};


// // connection des utilisateurs
// exports.login = (req, res, next) => {
//     // trouver le user dans la base de données qui correspond a l'adresse email entrer par l'utilisateur
//     User.findOne({ email: req.body.email })
//         .then(user => {
//             // si l'email est pas dans la base on renvoie une erreur
//             if(!user) {
//                 return res.status(401).json({ error: 'Utilisateur inconnu !'})
//             }
//             // on compare le mdp entré avec le hash dans la base de données
//             bcrypt.compare(req.body.password, user.password)
//                 .then(valid => {
//                     // si la comparaison est mauvaise on renvoie une erreur
//                     if(!valid) {
//                         return res.status(401).json({ error: 'Mot de passe incorrect !'})
//                     }
//                     // si la comparaison est bonne on renvoi l'userId et un token
//                     res.status(200).json({
//                         userId: user._id,
//                         token: jwt.sign(
//                             { userId: user._id },
//                             `${process.env.MY_TOKEN}`,
//                             { expiresIn:'24h'}
//                         )
//                     });
//                 })
//                 .catch(error => res.status(503).json({ error}));
//         })
//         .catch(error => res.status(502).json({ error}));
// };

exports.login = async (req, res) => {
    // Trouver l'user dans la base de données qui correspond à l'adresse email du user
    try {
        const user = await User.findOne({ email: req.body.email});
        // si l'email est pas dans la base on renvoie une erreur
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur inconnu !'})
        } else {
            try {
                // on compare le mdp entré avec le hash dans la base de données
                const valid = await bcrypt.compare(req.body.password, user.password)
                // si la comparaison est mauvaise on renvoie une erreur
                if(!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !'})
                // si la comparaison est bonne on renvoi un objet json qui contient userID et un token generer via un une signature qui va verifier une clé secrete connue uniquement du fichier env
                } else {
                    res.status(200).json({
                        userId: user._id, 
                        // création d'un token grace a l'userid + la cle secrete avec une durée de validité de 24h
                        token: jwt.sign({ userId: user._id },
                            `${process.env.MY_TOKEN}`,
                            { expiresIn:'24h'})});
                }
            } catch (error) {
                res.status(401).json({ error})
            }
        }
    } catch (error) {
        res.status(401).json({ error})
    }


}