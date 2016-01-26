/**
 * Created by max on 26.01.16.
 */

var express = require('express'),
    config  = require('./server/config.js'),
    socketServer  = require('./server/vws.socket.js').server;

var connections = [];

socketServer( 'demoserver1', function ( connection, server ) {

    connection.on('open', function ( id ) {
        console.log('[open] %s', id);
        connections.push(connection);
    });

    connection.on('message', function ( msg ) {
       //TODO: why the fuck is this not going out.
        connections.forEach(function (conn) {
            console.log(msg);
            conn.send(msg.utf8Data);
        });
    });

    connection.on('error', function ( err ) {
        console.log(err);
    });

    connection.on('close', function(){
        connections = connections.filter(function (conn) {
            return connection != conn;
        });
        // console.log('[close]');
    });


}).config( config );

var app = express();
var httpPort = config.port +10;

require('./server/express_config')(app, config);

app.listen(httpPort, function(){
    console.log('Magic is at %s', httpPort);
});