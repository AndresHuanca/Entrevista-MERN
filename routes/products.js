const { Router } = require('express');

//importando para la validacion
const { check } = require('express-validator');

//importando db-validators
const { 
        productCategoryExistsById,
        productExistsById,
} = require('../helpers');

//importando middleware
const { 
        validateFields,
        validateJWT,
} = require('../middlewares');

const {  
        postProduct,
        getProducts,
        getProduct,

} = require('../controllers/products');


const router = Router();

// POST  - middleware segundo argumento , crear errores
router.post('/', [
        validateJWT,
        //validaciones de los argumentos enviados en post
        check( 'name', 'The name is not valid' ).not().isEmpty(), 
        check( 'description', 'The description is not valid' ).not().isEmpty(), 
        check( 'price', 'The price is not valid' ).not().isEmpty(), 
        check( 'image', 'The image is not valid' ).not().isEmpty(), 
        check( 'category', 'The category is not valid' ).not().isEmpty(), 
        check( 'category', 'It is not a valid date' ).isString(),
        validateFields,

], postProduct );
// Tener en cuenta para crear un usuario administrador con JWT (escalable)

// GET All
router.get('/', [
        // validateJWT,
        validateFields,
], getProducts );

// GET-SEARCH pruct name
router.get( '/:search', [
        check( 'search', 'The image is not valid' ).not().isEmpty(),
        check( 'search', 'It is not a valid date' ).isString(), 
        validateFields,
], getProduct );



module.exports = router;