
const dbValidators = require('./db-validators');
const generarJWT = require('./generate-jwt');

module.exports = {
    ...dbValidators,
    ...generarJWT,
};