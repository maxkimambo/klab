/**
 * Created by max on 26.01.16.
 */

var express = require('express'),
    config  = require('./server/config.js'),
    socketServer  = require('./server/vws.socket.js').server;

socketServer( 'demoserver1', function ( connection, server ) {

    connection.on('open', function ( id ) {
        console.log('[open]');
    });

    connection.on('message', function ( msg ) {
        console.log('[message]');
        console.log(msg);
        connection.send( msg.utf8Data );
    });

    connection.on('error', function ( err ) {
        console.log(err);
    });

    connection.on('close', function(){
        // console.log('[close]');
    });

}).config( config );

var app = express();
var httpPort = config.port +10;

require('./server/express_config')(app, config);

app.listen(httpPort, function(){
    console.log('Magic is at %s', httpPort);
});

