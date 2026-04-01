//je crée un serveur http

/**
 * cette ligne de code importe le module http
 */
const http = require('http');

/**
 * cette ligne importe l'application express definie dans le fichier app.js
 */
const app = require('./app');

/**
 * cette variable définit le numéro de port sur lequel le serveur écoutera les requêtes entrantes.
*/
const numeroPort = 3004;

/**
 * cette ligne configure le port sur lequel l'application Express écoutera les requêtes.
 */
app.set('port', numeroPort);

/**
 * cette ligne céer un serveur HTTP en utilisant l'application Express importée.
 */
const serveur = http.createServer(app);

/**
 * cette fonction démarre le serveur et affiche un message dans la console indiquant que le serveur est en cours d'exécution.
*/
serveur.listen(numeroPort, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${numeroPort}`);
});