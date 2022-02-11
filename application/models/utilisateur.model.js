const sql = require("./db.js");
// constructor
const Utilisateur = function(utilisateur) {
 this.id = utilisateur.id;
 this.nom = utilisateur.nom;
 this.prenom = utilisateur.prenom;
 this.telephone = utilisateur.telephone;
 this.email = utilisateur.email;
 this.photo = utilisateur.photo;
};
//le module.exports est l'objet retourné lorsqu'on utilise require
module.exports = Utilisateur;