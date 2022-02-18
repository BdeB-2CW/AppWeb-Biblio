const sql = require("./db.js");
// constructor
const Livre = function(livre) {
 this.id = livre.id;
 this.auteur = livre.auteur;
 this.titre = livre.titre;
 this.dateparution = livre.dateparution;
 this.nombredecopies = livre.nombredecopies;
 this.isbn = livre.isbn;
 this.cout = livre.cout;
 this.description = livre.description;
 this.utilisateurs_id = livre.utilisateurs_id;
};
//le module.exports est l'objet retourné lorsqu'on utilise require
module.exports = Livre;