const express = require("express");
require("dotenv").config();

const router = require('./src/routes/index');

const errorHandler = require('./src/middleware/errorHandler');

const app = express();

const { Server: HttpServer } = require('http');
const { Server: IoServer } = require('socket.io');

const http = new HttpServer( app );
const io = new IoServer( http );

const contMes = require('./src/storage/mensajes');
const cont = require('./src/storage/productos');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', router);
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

//app.use(express.static(__dirname + '/public'));

app.use( errorHandler );

io.on('connection', async socket => {

    const messages = await contMes.getAll();

    console.log('Nuevo cliente conectado!');

    socket.emit('UPDATE_DATA', messages);

    socket.on('NEW_MESSAGE_CLI', async data => {

        await contMes.save( data );
        
        io.sockets.emit('NEW_MESSAGE', data);

    });

    const products = await cont.getAll();

    socket.emit('UPDATE_PRODUCT', products);

    socket.on('NEW_PRODUCT_CLI', async data => {

        await cont.save( data );
        
        io.sockets.emit('NEW_PRODUCT', data);

    });

});

module.exports = http;