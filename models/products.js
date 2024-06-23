//debe tener el mismo nombre de la coleccion pero sin la "s"

const { Schema, model } = require('mongoose');

const ProductSchema = Schema({ 

    name:{
        type: String,
        required: [ true, 'The name is mandatory'],
    },
    description:{
        type: String,
        default: true, 
    },
    price: { 
        type: Number, 
    },
    image: { 
        type: String, 
    },
    category: {
        type: String,
        default: true, 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }    
}, { timestamps: true } );

//sobreescribir funcion toJSON para no enviar el password y el _vv y el _id en el postman
ProductSchema.methods.toJSON = function() {

    const {__v, estado, _id, ...data } = this.toObject();
    // Establece en usuario: el Id
    data.user = data.user._id;
    // renombrar el _id publicacion a id
    data.id = _id;
    delete data.user._id;
    return data;

};

module.exports = model( 'Product', ProductSchema, 'products');