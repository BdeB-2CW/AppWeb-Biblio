//On importe d'abord le module mysql
const mysql = require('mysql');
//On importe la configuration de la base de données en appellant le fichier créé dans le dossier configuration
const dbConfig = require('../config/db.config.js');
// À partir de là on établit la connexion
const connection = mysql.createConnection({
//Ces informations sont contenues dans le fichier db.config.js
 host: dbConfig.HOST,
 user: dbConfig.USER,
 password: dbConfig.PASSWORD,
 database: dbConfig.DB
});
// open the MySQL connection
connection.connect(error => {
 if (error) throw error;
 /*
 connection.query("SELECT * FROM utilisateurs ", function (err, result){
 if (err) throw err;
 console.log(result);
 });
 */
 console.log("Vous êtes connecté à la base de données.");
});
//le module.exports est l'objet retourné lorsqu'on utilise require
module.exports = connection;
