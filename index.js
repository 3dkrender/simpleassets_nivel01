/**
 * Pruebas de acceso a la blockchain de WAX para gestionar tokens SimpleAssets
 */
const simpleassets = require('./simpleassets');

// Crear NFT
simpleassets.crearNFT('<nombre-de-usuario>')
    .then(resolve => {
        console.log(resolve);
    });

// Borrar NFT
simpleassets.burnNFT('<nombre-de-autor>', '<nombre-de-propietario>', [<array-IDs>], 'Nos vemos en el nivel 2')
//     .then(resolve => {
//         console.log(resolve);
//     });
