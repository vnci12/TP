//app.js
const express = require('express');


//j'importe le pilote Mysql2 utiliser pour interroger la base de données
const mysql2 = require('mysql2');

/**
 * cette ligne crée une instance de l'application Express.
*/

//j'importe le pilote express-myconnection utiliser me connecter à la base de données
const myconnection = require('express-myconnection');

//je crée une instance de l'application Express
const app = express();

//j'utilise le middleware express.json pour analyser les données JSON envoyées dans les requêtes POST.
app.use(express.json());

//j'utilise le middleware express.urlencoded pour analyser les données de formulaire envoyées dans les requêtes POST. L'option extended: true permet d'analyser les données de formulaire avec des objets imbriqués.
app.use(express.urlencoded({ extended: true }));

//je configure les elements attendus pour me connecter a MySQL
const optionsConnexionBaseDeDonnees = {
    host: "localhost",
    user: "root",
    password: "Bouboule97615#",
    database: "tpgestion"
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
/*app.get('/api/offremobile', (req, res) => {
    console.log('Requête GET reçue pour /api/offremobile');

    res.render('offremobile');
});*/

app.get('/api/offremobile', (req, res) => {
    console.log('Requête reçue sur /api/offremobile');
    //je me connecte à la base de données pour récupérer les offres mobiles
    req.getConnection((erreur, connection) => {
        if(erreur) {
            //je vérifie s'il y a une erreur lors de la connexion à la base de donnée
            console.log('Erreur de connexion à la base de données : ', erreur);
        } else {
            //je prépare la requête SQL pour récupérer les offres mobiles
            const requeteSQL = "SELECT * FROM offre_mobile";
            //je exécute la requête SQL pour récupérer les offres mobiles
            connection.query(requeteSQL, (err, resultatOffreMobile) => {
                if(err) {
                    console.log('Erreur lors de la récupération des offres mobiles : ', err);
                    res.status(500).json({ message: "Erreur lors de la récupération des offres mobiles." });
                } else {
                    console.log('Offres mobiles récupérées avec succès !');
                    res.render('offremobile', { resultatOffreMobile });
                }
            });
        }
    });
});
// Route POST pour ajouter une offre mobile au panier et afficher le panier
app.post('/api/offremobile', (req, res) => {
    console.log('Requête POST reçue pour /api/offremobile');
    const data = req.body;
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log('Erreur de connexion à la base de données : ', erreur);
            return res.status(500).json({ message: "Erreur de connexion à la base de données." });
        }
        // Insertion de l'offre mobile dans le panier
        const requeteSQL = "INSERT INTO panier (nom, data_incluse, appels_sms_inclus, prix) VALUES (?, ?, ?, ?)";
        const valeurs = [data.nom, data.data_incluse, data.appels_sms_inclus, data.prix];
        connection.query(requeteSQL, valeurs, (err, result) => {
            if (err) {
                console.log('Erreur lors de l\'ajout au panier : ', err);
                return res.status(500).json({ message: "Erreur lors de l'ajout au panier." });
            }
            // Après ajout, on récupère le panier et on l'affiche
            connection.query("SELECT * FROM panier", (err2, resultatPanier) => {
                if (err2) {
                    console.log('Erreur lors de la récupération du panier : ', err2);
                    return res.status(500).json({ message: "Erreur lors de la récupération du panier." });
                }
                res.render('panier', { resultatPanier });
            });
        });
    });
});









//route GET pour l'API telephone (/api/telephone) qui rend la vue "telephone.ejs".
/*app.get('/api/telephone', (req, res) => {
    console.log('Requête GET reçue pour /api/telephone');


    res.render('telephone');
});*/

app.get('/api/telephone', (req, res) => {
    console.log('Requête reçue sur /api/telephone');
    //je me connecte à la base de données pour récupérer les offres mobiles
    req.getConnection((erreur, connection) => {
        if(erreur) {
            //je vérifie s'il y a une erreur lors de la connexion à la base de donnée
            console.log('Erreur de connexion à la base de données : ', erreur);
        } else {
            //je prépare la requête SQL pour récupérer les offres mobiles
            const requeteSQL = "SELECT * FROM telephone";
            //je exécute la requête SQL pour récupérer les offres mobiles
            connection.query(requeteSQL, (err, resultatTelephone) => {
                if(err) {
                    console.log('Erreur lors de la récupération des offres mobiles : ', err);
                    res.status(500).json({ message: "Erreur lors de la récupération des offres mobiles." });
                } else {
                    console.log('Offres mobiles récupérées avec succès !');
                    res.render('telephone', { resultatTelephone });
                }
            });
        }
    });
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

//route GET pour l'API panier (/api/panier) qui rend la vue "panier.ejs".
app.get('/api/panier', (req, res) => {
    console.log('Requête reçue sur /api/panier');
    //je me connecte à la base de données pour récupérer les offres mobiles
    req.getConnection((erreur, connection) => {
        if(erreur) {
            //je vérifie s'il y a une erreur lors de la connexion à la base de donnée
            console.log('Erreur de connexion à la base de données : ', erreur);
        } else {
            //je prépare la requête SQL pour récupérer les offres mobiles
            const requeteSQL = "SELECT * FROM panier";
            //je exécute la requête SQL pour récupérer les offres mobiles
            connection.query(requeteSQL, (err, resultatPanier) => {
                if(err) {
                    console.log('Erreur lors de la récupération du panier : ', err);
                    res.status(500).json({ message: "Erreur lors de la récupération du panier." });
                } else {
                    console.log('Offres mobiles récupérées avec succès !');
                    res.render('panier', { resultatPanier });
                }
            });
        }
    });
});

//mhethode poste pour recuperer les information et les ajouter au panier
app.post('/api/panier/add', (req, res) => {
    console.log('Requête POST reçue pour /api/panier/add');
    const data = req.body;
    console.log('Données reçues : ', data);
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log('Erreur de connexion à la base de données : ', erreur);
            return res.status(500).json({ message: "Erreur de connexion à la base de données." });
        }
        let requeteSQL = '';
        let valeurs = [];
        // Détection du type d'ajout (offre mobile ou téléphone)
        if (data.nom && data.data_incluse && data.appels_sms_inclus) {
            // Offre mobile
            requeteSQL = "INSERT INTO panier (nom, data_incluse, appels_sms_inclus, prix) VALUES (?, ?, ?, ?)";
            valeurs = [data.nom, data.data_incluse, data.appels_sms_inclus, data.prix];
        } else if (data.marque && data.modele) {
            // Téléphone
            requeteSQL = "INSERT INTO panier (marque, modele, prix) VALUES (?, ?, ?)";
            valeurs = [data.marque, data.modele, data.prix];
        } else {
            return res.status(400).json({ message: "Données invalides pour l'ajout au panier." });
        }
        connection.query(requeteSQL, valeurs, (err, result) => {
            if (err) {
                console.log('Erreur lors de l\'ajout au panier : ', err);
                return res.status(500).json({ message: "Erreur lors de l'ajout au panier." });
            }
            res.json({ message: "Ajouté au panier !" });
        });
    });
});

//methode delete pour supprimer un élément du panier
app.delete('/api/panier/remove/:id', (req, res) => {
    console.log('Requête DELETE reçue pour /api/panier/remove/:id');
    const id = req.params.id;

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log('Erreur de connexion à la base de données : ', erreur);
            return res.status(500).json({ message: "Erreur de connexion à la base de données." });
        }

        const requeteSQL = "DELETE FROM panier WHERE id = ?";
        connection.query(requeteSQL, [id], (err, result) => {
            if (err) {
                console.log('Erreur lors de la suppression du panier : ', err);
                return res.status(500).json({ message: "Erreur lors de la suppression du panier." });
            }
            res.json({ message: "Élément supprimé du panier !" });
        });
    });
});





module.exports = app;