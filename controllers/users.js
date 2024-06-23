const { response, request } = require('express');
//importando para la encriptacion
const bcryptjs = require('bcryptjs');
// Importando modelo usuario
const { User } = require('../models');


// POST
const postUser = async( req , res = response ) => {

    const { name, lastName, email, password, role } = req.body;

    const roleUppercase = role.toUpperCase();
    
    //creando instancia de usuario
    let user = new User( { name, lastName, email, password, role: roleUppercase } );

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    
    //guardar en DB
    await user.save();

    return res.json({  
        user
    });

};

// GET
const getUsers = async( req, res = request ) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    //colecion de las 2 promesas dessutructradas
    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number( from ))
            .limit( Number( limit ))

    ]);

    res.json({
        total,
        users
    });

};

// PUT
const updateUser = async( req, res ) => {
    //para dinamico
    const { id } = req.params;

    //desustructurar, para no poder cambiar
    const { _id, google, state, role, password, ...rest } = req.body;

    if ( password ) {
         //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );

    }

    const user = await User.findByIdAndUpdate( id, rest, { new: true } );

    res.status(200).json({
        user
    });
};


// DELETE
const deleteUser = async( req, res ) => {

    const { id } = req.params;

    // borrar fisicamente
    const user =  await User.findByIdAndDelete( id );

    res.json({
        user
    });
};


module.exports = {
    deleteUser,
    getUsers,
    postUser,
    updateUser,
};