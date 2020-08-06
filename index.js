/**
 * Pruebas de acceso a la blockchain de WAX para gestionar tokens SimpleAssets
 */
const simpleassets = require('./simpleassets');

// Crear NFT
simpleassets.crearNFT('kbjqu.waa')
    .then(resolve => {
        console.log(resolve);
    });

// Borrar NFT
// simpleassets.burnNFT('kbjqu.waa', [100000004694043], 'Nos vemos en el nivel 2')
//     .then(resolve => {
//         console.log(resolve);
//     });