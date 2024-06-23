const { Router } = require('express');

//importando para la validacion
const { check } = require('express-validator');

//importando db-validators
const { 
        emailExists, 
        userExistsById,
} = require('../helpers');

//importando middleware
const { 
        validateFields,
        validateJWT,
} = require('../middlewares');

const {  
        deleteUser,
        getUsers,
        updateUser,
        postUser,
} = require('../controllers/users');

const router = Router();

// POST 
router.post('/', [
        check( 'name', 'The name is not valid' ).not().isEmpty(), 
        check( 'lastName', 'The last name is not valid' ).not().isEmpty(), 
        check( 'password', 'The password must be more than 6 letters' ).isLength( { min: 6 } ), 
        check( 'email', 'The email is not valid' ).isEmail(), 
        check( 'email' ).custom( emailExists ),
        validateFields,

], postUser );

// GET
router.get('/', [
        validateJWT,
        validateFields,
], getUsers );

// PUT
router.put('/:id',[
        validateJWT,
        check( 'id', 'It is not a valid id' ).isMongoId(),
        check( 'id' ).custom( userExistsById ),
        check( 'email' ).custom( emailExists ),
        validateFields,

], updateUser );


// DELETE
router.delete('/:id', [
        validateJWT,
        check( 'id', 'No es un Id  Valido' ).isMongoId(),
        check( 'id' ).custom( userExistsById ),
        validateFields,

], deleteUser );

module.exports = router;