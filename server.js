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
        //console.log(connection);
        var message = JSON.parse(msg.utf8Data);
        var i = 0;
        connections.forEach(function (conn) {
            if (message.id != conn.id){
                i++;
                console.log('sending to %s', conn.id);
                conn.send(msg.utf8Data);
                console.log(i); 
            }

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