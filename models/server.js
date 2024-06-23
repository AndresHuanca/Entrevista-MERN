require('express-async-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:              '/auth',
            products:          '/products',
            users:             '/users',
        };

        // Conectar a base de datos
        this.conectarDB();   
        //Middlewares
        this.middlewares();
        //Rutas
        this.routes();

        this.app.get('*', ( req, res ) => {
            res.sendFile(path.join(__dirname,'..', 'public', 'index.html'));
        });
        
    };

    // DB
    async conectarDB() {
        await dbConnection();
    };


    middlewares() {
        //cors
        this.app.use( cors() );

        //lectura y parseo del body recibir de json
        this.app.use( express.json() );

        // directorio publico
        this.app.use( express.static('public') );

    };
    
    routes() {
        
        this.app.use(  this.paths.auth,                require('../routes/auth') );
        this.app.use(  this.paths.products,            require('../routes/products') );
        this.app.use(  this.paths.users,               require('../routes/users') );
        this.app.use((err, req, res, next) => {
            console.error(err);
            next(err);
        });
    };

    
    listen() {
        
        this.app.listen( this.port, () => {
        console.log('Rest-server Entrevista 1.0', this.port );
        });
    }

}

module.exports = Server;