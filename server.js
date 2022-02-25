const db = require("./application/models/db.js")
const bodyParser = require('body-parser');
const express = require('express');

//const fs=require("fs");
//try to use alert
//const Swal = require('sweetalert2');
//const alert = require('alert');
//const popup = require('popups');


const app = express();
const port = 4000;
const { is } = require("express/lib/request");
const { Console } = require("console");


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
        //Au cas ou la réponse de la requête SQL est vide, cela signifie que l'élément saisi est inexistant, par conséquent, cet utilisateur n'existe pas
        try{
        if(result.length<1){
            //Si l'utilisateur est inexistant, on retourne à la page d'accueil
            res.render('404')

        }
    }catch(err){
        console.log("Erreur");
    } 
        //La réponse est la page profil.ejs
        //On déclare 'profil' ci-bas, car on va le reprendre dans la page profil.ejs
        res.render('profil.ejs', {profil: result});
    });
    
});

/**
 * Pages d'ouverture
 */

//Page register and login
app.get('/login', async (req, res) => {
    res.render('login');
});

app.post('/login', function(req, res){
    const dataReceived = req.body;

    //register   
    const reg_email = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
    const reg_tel = /^[0-9]{10}$/;
    if (dataReceived.option == "signUp"){
        var readyToSignUp = false;
        //check valide
        if (reg_email.test(dataReceived.signUpEmail)){
            if (dataReceived.signUpPassword){
                if (dataReceived.signUpNom){
                    if (dataReceived.signUpPrenom){
                        if(reg_tel.test(dataReceived.signUpTel)){
                            readyToSignUp = true;
                        }
                    }
                }
            }
        }
        if(readyToSignUp){
            const rand = Math.floor(Math.random() * 12) + 1;
            //send information to db
            var sql =   "insert into Utilisateurs (ID, Nom, Prenom ,Telephone, Email, Password, MaxPret, NbPret, Droit_id, Photo) VALUES" + 
                        " (ID, '" + 
                        dataReceived.signUpNom + "', '" + 
                        dataReceived.signUpPrenom + "', '" + 
                        dataReceived.signUpTel + "', '" + 
                        dataReceived.signUpEmail + "', '" + 
                        dataReceived.signUpPassword + "', 5, 0, 0, " + 
                        "'\/Images\/Profil\/"+ rand +".png');"

            try{
                db.query(sql, function (err, result) {
                    if (err) {     
                        console.log(err);                  
                        res.status(422).end('Information exist deja dans le base de donnee');                       
                    } else {
                        var sqlId = "select ID from Utilisateurs where Email =" +"'" +dataReceived.signUpEmail+"'" +";"
                        db.query(sqlId, function (err, result) {
                            if (err) {     
                                console.log(err);                            
                            } else{
                                res.redirect("/profils/" + result[0].ID)
                            }
                        })
                    }           
                });
            } catch(err){               
            }           
        }
    }//end of register
    //login
    if(dataReceived.option == "signIn"){
        var readyToSignIn = false;
        if (reg_email.test(dataReceived.signInEmail)){
            if (dataReceived.signInPassword){
                readyToSignIn = true;
            }
        }

        if(readyToSignIn){
            //send information to db
            var sql = "select ID, Email, Password from Utilisateurs where Email =" +"'" +dataReceived.signInEmail+"'" +";"
            try {
                db.query(sql, function (err, result) {
                    if(err){
                        console.log(err);                        
                    }else{                    
                        try{
                            if(result[0].Password == dataReceived.signInPassword){
                                res.redirect("/profils/" + result[0].ID);
                            }else{
                                res.status(423).end('wrong password');
                            }
                        }catch{
                            res.status(422).end('user not exist');
                        }
                    }
                });
            }catch(err){
                console.log(err)
            }
        }

    } //end of login
})

//Page profil fait Mohamed Wafi
app.get('/profils/:profil', (req, res) => {
    //Tout d'abord il faut déclarer la variable idProfil extraite de l'URL saisi
    var idProfil=req.params.profil;
    //Déclaration de la requête SQL dans le format suivant (très important) pour chercher les infos du profil relié à l'ID saisi
    let requeteSQL='SELECT * FROM utilisateurs WHERE id=' + "'" + idProfil + "'"; 
    //ON FAIT LA REQUÊTE !!         
    db.query(requeteSQL,(err, result) => {
        //Au cas ou la réponse de la requête SQL est vide, cela signifie que l'élément saisi est inexistant, par conséquent, cet utilisateur n'existe pas
        if(result.length<1){
            //Si l'utilisateur est inexistant, on retourne à la page d'accueil
            res.render('404')
        }
        //La réponse est la page profil.ejs
        //On déclare 'profil' ci-bas, car on va le reprendre dans la page profil.ejs
        res.render('profil.ejs', {profil: result});
    });   

});

//page Acceuil
app.get('/',(req,res) => {
    res.render('Acceuil');
});

//Page recherche, on liste les tous les livres dans la base de donnee en ce moment
app.get('/recherche', (req, res) => {  
    try{
        let query = "SELECT ISBN, Titre, Photo FROM LIVRES"
        db.query(query, function (err, result) {
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
            result.render("404.ejs");
        } else {
            res.render('livres.ejs', { livre: result });
        }
    });
});


app.listen(port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});