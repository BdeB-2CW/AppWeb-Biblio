const sql = require("./db.js");
// constructor
const Utilisateur = function(utilisateur) {
 this.id = utilisateur.id;
 this.nom = utilisateur.nom;
 this.prenom = utilisateur.prenom;
 this.telephone = utilisateur.telephone;
 this.email = utilisateur.email;
 this.password = utilisateur.password;
 this.photo = utilisateur.photo;
 this.maxpret = utilisateur.maxpret;
 this.nbpret = utilisateur.nbpret;
 this.droit_id = utilisateur.droit_id;
};
//le module.exports est l'objet retourné lorsqu'on utilise require
module.exports = Utilisateur;