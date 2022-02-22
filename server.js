
const db= require("./application/models/db.js")
const fs=require("fs");
const bodyParser = require('body-parser');
const express = require('express');
//try to use alert
//const Swal = require('sweetalert2');
const alert = require('alert');
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
        if(result.length<1){
            //Si l'utilisateur est inexistant, on retourne à la page d'accueil
            res.render('404')

        }
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
    const dataReceived = req.body;
    //console.log(dataReceived.option);

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
            //send information to db
            var sql =   "insert into Utilisateurs (ID, Nom, Prenom ,Telephone, Email, Password, MaxPret, NbPret, Droit_id, Photo) VALUES" + 
                        " (ID, '" + 
                        dataReceived.signUpNom + "', '" + 
                        dataReceived.signUpPrenom + "', '" + 
                        dataReceived.signUpTel + "', '" + 
                        dataReceived.signUpEmail + "', '" + 
                        dataReceived.signUpPassword + "', 5, 0, 0, " + 
                        "'\/Images\/Profil\/1.png');"
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
        console.log("login");
        var readyToSignIn = false;
        if (reg_email.test(dataReceived.signInEmail)){
            if (dataReceived.signInPassword){
                readyToSignIn = true;
            }
        }

        if(readyToSignIn){
            console.log("ready to login")
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

//acceuil
app.get('/',(req,res) => {
    res.render('Acceuil');
});

//recherche liste de donnee
app.get('/recherche', (req, res) => {  
    res.render('recherche')  
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



require("./application/routes/livre.routes.js")(app);
require("./application/routes/utilisateur.routes.js")(app);

app.listen(port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});