/**
 * Funciones de acceso a la blockchain de WAX para gestión de tokens del smart contract SimpleAssets
 */
const {Api, JsonRpc, RpcError} = require('eosjs');
const {JsSignatureProvider} = require('eosjs/dist/eosjs-jssig'); 
const fetch = require('node-fetch'); 
const {TextEncoder, TextDecoder} = require('util'); 
const {read, promises} = require('fs');
const {resolve} = require('path');

// Leer active key desde archivo externo
require('dotenv').config({ path: './.env.keys' });

// Crear conexión
const signatureProvider = new JsSignatureProvider([process.env.privateKey]);
const rpc = new JsonRpc('https://api.waxsweden.org', {fetch});
const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
});

/**
 * 
 * @param {*} autor Nombre de la cuenta propietaria y creadora del NFT
 */
module.exports.crearNFT = function (autor) {
    return new Promise(resolve => {
        api.transact({
            actions: [{
                account: 'simpleassets',
                name: 'create',
                authorization: [{
                    actor: autor,
                    permission: 'active'
                }],
                data: {
                    author: autor,
                    category: 'Pruebas',
                    owner: autor,
                    idata: JSON.stringify({
                        name: 'Curso WAX-JavaScript con Marcos DK y eosBarcelona',
                        nivel: 'Novicio',
                        desc: 'Superado el nivel 1 de programación en JavaScript para WAX!',
                    }),
                    mdata: JSON.stringify({
                        img: 'https://radaquest.net/wp-content/uploads/2020/08/javascriptnivel01.jpg',
                        url: 'https://medium.com/eosbarcelona',
                    }),
                    requireclaim: false
                }
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        }).then(response => {
            resolve(response);
        }).catch(err => {
            console.log(err, JSON.stringify(err));
        });
    });
}

/**
 * 
 * @param {*} autor Nombre de la cuenta propietaria y creadora del NFT
 * @param {*} nfts  [Array] de IDs que se desean borrar
 * @param {*} memo  Mensaje de despedida?
 */
module.exports.burnNFT = function (autor, nfts, memo) {
    return new Promise(resolve => {
        api.transact({
            actions: [{
                account: 'simpleassets',
                name: 'burn',
                authorization: [{
                    actor: autor,
                    permission: 'active'
                }],
                data: {
                    owner: autor,
                    assetids: nfts,
                    memo: memo
                }
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        }).then(response => {
            resolve(response)
        }).catch(err => {
            console.log(err, JSON.stringify(err));
        });
    });
}
