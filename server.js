
const db= require("./application/models/db.js")
const fs=require("fs");
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 4000;
const { is } = require("express/lib/request");




app.use( express.static( "public" ) );
app.use('/CSS', express.static(__dirname + 'CSS'))
app.use('./public/images', express.static(__dirname + 'images'))

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json());

//profil fait Mohamed Wafi
app.get('/profils/:profil', (req, res) => {
    //Tout d'abord il faut déclarer la variable idProfil extraite de l'URL saisi
    var idProfil=req.params.profil;
    //Déclaration de la requête SQL dans le format suivant (très important) pour chercher les infos du profil relié à l'ID saisi
    let requeteSQL='SELECT * FROM utilisateurs WHERE id=' + "'" + idProfil + "'"; 
    //ON FAIT LA REQUÊTE !!         
    db.query(requeteSQL,(err, result) => {
        if(err) throw err;
        //La réponse est la page profil.ejs
        //On déclare 'profil' ci-bas, car on va le reprendre dans la page profil.ejs
        res.render('profil.ejs', {profil: result});
    });
    
    

});

/**
 * Pages d'ouverture
 */

app.get('/login', async (req, res) => {
    //show all users
    //const users = await User.find()
    //console.log(users)
    res.render('login');
});
/*
//register and login
app.post('/login', async (req, res) => {
    const dataReceived = req.body
    res.status(201).send('babalba')
    //register
    
    if (dataReceived.option == "signUp"){
        //check valide
        if (!dataReceived.username){
            return res.status(422).end('username is required')
        }

        if (!dataReceived.password){
            return res.status(422).end('password is required')
        }

        if (!dataReceived.email){
            return res.status(422).end('email is required')
        }
        //res.send('post checked')
        
        //put new user data to mongodb
        try{
            const user = await User.create({
            username: dataReceived.username,
            password: dataReceived.password,
            email: dataReceived.email  
        })
        console.log('Utilisateur cree')    
        res.redirect("/Liste")

        }catch(err){
            console.log(err)
            return res.status(422).end('user exist')
        }         
    }//End of register  

    //login
    if (dataReceived.option == "signIn"){
        //check data received valide
        const dataReceived = req.body       
        if (!dataReceived.username){
            return res.status(422).end('username is required')
        }

        if (!dataReceived.password){
            return res.status(422).end('password is required')
        }
        //console.log("login post checked")

        //find user with same name
        const userLogin = await User.findOne({
            username: dataReceived.username
        })
        if (!userLogin) { 
            return res.status(422).send({ message: 'user not exist'})
        }
        //compaire password
        const isPasswordValid = require('bcrypt').compareSync(
            dataReceived.password,
            userLogin.password
        )
        if (!isPasswordValid) {
            return res.status(422).send({ message: 'wrong password' })
        }


    res.redirect("/")
        //end of login
    }

 
});//end of post
*/

//restart post
app.post('/login', function(req, res){
    
})

//acceuil
app.get('/',(req,res) => {
    res.render('Acceuil');
});

//recherche liste de donnee
app.get('/recherche', (req, res) => {  
    try{
        let query = "SELECT ISBN, Titre, Photo FROM LIVRES"
        db.query(query, function (err, result) {
            console.log(result.length);
            res.render('recherche', {livresTab: result})
        });
        
    }catch(err){
        console.log(err);
    }
        
      
})

//livre
app.get('/livres/:isbn', (req, res) => {
    var isbn = req.params.isbn;
    var sql =  "select * from livres where isbn =" +"'" +isbn+"'" +";";
    db.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.render('livres.ejs', { livre: result });
        }
    });
});



require("./application/routes/livre.routes.js")(app);
require("./application/routes/utilisateur.routes.js")(app);

app.listen(port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});