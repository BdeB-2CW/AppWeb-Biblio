const mongoose = require("mongoose");

var uri = "mongodb://localhost:27017/Biblio";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("La connexion avec la MongoDB a bien été etabli");
});

module.exports = mongoose;