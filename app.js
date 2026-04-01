//app.js
const express = require('express');


//j'importe le pilote Mysql2 utiliser pour interroger la base de données
const mysql2 = require('mysql2');

/**
 * cette ligne crée une instance de l'application Express.
*/

//j'importe le pilote express-myconnection utiliser me connecter à la base de données
const myconnection = require('express-myconnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//je configure les elements attendus pour me connecter a MySQL
const optionsConnexionBaseDeDonnees = {
    host: "localhost",
    user: "root",
    password: "Bouboule97615#",
    database: "gestion_des_taches"
};

/**
 * middleware pour se connecter à la BDD MySQL "pool" est une méthode de connexion qui utilise un pool de connexions pour gérer les connexions à la base de données. Cela permet d'améliorer les performances en réutilisant les connexions existantes plutôt que d'en créer de nouvelles à chaque requête.
 */
app.use(myconnection(mysql2, optionsConnexionBaseDeDonnees, "pool"));

//je précise que les vues sont dans le dossier "views"
app.set('views', './views');

//je précise que le moteur de rendu est "ejs"
app.set('view engine', 'ejs');

//je précise que les fichiers statiques sont dans le dossier "public"
app.use(express.static('public'));

//routes get pour /
app.get('/', (req, res) => {
    console.log('Requête GET reçue pour /');

    res.write("<p>Bienvenue sur la page d'accueil de notre site internet !</p>");

    res.end();
});

/**
 * route GET pour l'API accueil (/api/accueil) qui renvoie un message de bienvenue au format JSON.
*/
app.get('/api/accueil', (req, res) => {
    console.log('Requête reçue sur /api/accueil');

    res.render('accueil');
});

//route GET pour l'API offremobile (/api/offremobile) qui rend la vue "offremobile.ejs".
app.get('/api/offremobile', (req, res) => {
    console.log('Requête GET reçue pour /api/offremobile');

    res.render('offremobile');
});

//route GET pour l'API telephone (/api/telephone) qui rend la vue "telephone.ejs".
app.get('/api/telephone', (req, res) => {
    console.log('Requête GET reçue pour /api/telephone');


    res.render('telephone');
});

//route GET pour l'API client (/api/client) qui rend la vue "client.ejs".
app.get('/api/client', (req, res) => {
    console.log('Requête GET reçue pour /api/client');

    res.render('client');
});

//route GET pour l'API contact (/api/contact) qui rend la vue "contact.ejs".
app.get('/api/contact', (req, res) => {
    console.log('Requête GET reçue pour /api/contact');

    res.render('contact');
});

app.get('/api/offremobile', (req, res) => {
    console.log('Requête GET reçue pour /api/offremobile');

    //1. je me connecte
    req.getConnection((err, connexion) => {
        if(erreur) {//je vérifie s'il y a une erreur de connexion
            console.log(erreur);
        } else {
            //2. je fais la requete SQL pour récupérer les données de la table "offre_mobile"
            connexion.query('SELECT * FROM offre_mobile', (erreur, resultats) => {
                if(erreur) {//je vérifie s'il y a une erreur de requete
                    console.log("Erreur dans la requete SQL");
                } else {
                    //3. j'affiche les résultats dans la console
                    console.log("mes offres mobiles :", resultats);
                    res.render('offremobile', { resultOffreMobile });
                }
            });
        }
    });
});



module.exports = app;