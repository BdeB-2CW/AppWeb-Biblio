// Ce document est écrit 99% par Zhi Bo Cao
const fs=require("fs");
const express = require('express');
const app = express();
const port = 4000;

app.use(express.static('public'))
app.use('/CSS', express.static(__dirname + 'CSS'))

app.set('view engine', 'ejs');




/**
 * Pages d'ouverture
 */

app.get('/login', async (req, res) => {
    //show all users
    //const users = await User.find()
    //console.log(users)
    res.render('login');
});

//register and login
app.post('/login', async (req, res) => {
    const dataReceived = req.body
    //console.log(dataReceived);

    //register
 

    //login

    res.redirect("/")
        //end of login
    

 
});//end of post

//acceuil
app.get('/',(req,res) => {
    res.render('Acceuil');
});

//recherche liste de donnee
app.get('/recherche', (req, res) => {  
    res.render('recherche')  
})

//livre
app.get('/livres/:livre', (req, res) => {
    res.render('livres')
});

//profil
app.get('/profils/:profil', (req, res) => {
    res.render('profil')

});

require("./application/routes/livre.routes.js")(app);
require("./application/routes/utilisateur.routes.js")(app);
app.listen(port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});