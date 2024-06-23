//importando modelo usuario //importando modelo categoria
const { Role, User, Post, PostCategory, AboutUs, ProductCategories, Products, ShoppingCart } = require('../models');

//--------------------------------------USERS------------------------------------- 
//verificar si el usuario existe
const userExistsById = async ( id = '' ) => {  
    let userExists = await User.findById( id );
    if( !userExists ) {
        throw new Error( `The user's id: ${ id } does not exist in the database` );
    }

};

//verificar si el correo existe
const emailExists = async ( email = '' ) => {  
    let emailExists = await User.findOne( { email } );
    if( emailExists ) {
        throw new Error( `The email: ${ email } already exists in the database` );
    }

};


// ----------------------POST-----------------------------

const postExistsdById = async ( id = '' ) => { 
    // verifficar si el id existe
    let postExists = await Post.findById( id );
    if( !postExists ) {
        throw new Error( `The id: ${ id } not found`)
        
    }
};


//-----------------------PUBLICACION----------------------------------- 
// Validación de Nombre unico de Productos
const nombreProductoExiste = async ( nombre = '' ) => {  
    // Convirtiendo a toUpperCase porque asi esta en la DB
    nombre = nombre.toUpperCase();
    //verificar si el correo existe
    let existeNombre = await Producto.findOne( { nombre } );
    if( existeNombre ) {
        throw new Error( `El nombre ${ nombre } ya existe` );
    }

};


// -----------------------------PRODUCTOS----------------------------------------------------------------
//verificar si el producto existe
const productExistsById = async ( id = '' ) => {  
    let productExists = await Products.findById( id );
    if( !productExists ) {
        throw new Error( `The product's id: ${ id } does not exist in the database` );
    }

};




module.exports = {
    userExistsById,
    emailExists,
    postExistsdById,
    nombreProductoExiste,
    productExistsById
};