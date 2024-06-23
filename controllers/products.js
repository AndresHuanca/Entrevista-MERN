const { response } = require('express');

const { Products } = require('../models');

//POST 
const postProduct = async( req, res = response ) => {

    const { imageId, user, category, ...body } = req.body;

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    };

    // Crear Publicacion
    const product = new Products( data );

    // Guardar en DB
    await product.save();

    // msg
    res.status(201).json( product );

};

// GET Display All
const getProducts = async ( req, res ) => {

    const { limit = 5, from = 0 } = req.query;
    
    const products = await Products.find()
                    .skip(Number( from ))
                    .limit(Number( limit ))
                    .sort( { createdAt: -1 } );

    res.json({
        products
    });
};


//GET Display by Id 
const getProduct = async ( req, res ) => {

    const { search } = req.params;
    // For hacer mas sensibles las busquedas
    const regex = new RegExp( search, 'i');
    // con el count en reemplazo de find da la cantidad
    const product =  await Products.find({ name: regex })
        .populate('name' );


    res.json({
        product
    });

};



module.exports = {
    getProduct,
    getProducts,
    postProduct,
};