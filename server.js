/**
 * Created by max on 26.01.16.
 */

var express = require('express'),
    config  = require('./server/config'),
    repo = require('./server/Repo'),
    socketServer  = require('./server/vws.socket.js').server;

var connections = [];

socketServer( 'demoserver1', function ( connection, server ) {

    connection.on('open', function ( id ) {
        console.log('[open] %s', id);
        connections.push(connection);
    });

    connection.on('message', function ( msg ) {
        console.log(msg);

        var message = JSON.parse(msg.utf8Data);
        console.log(message);

        // if any other command detected
        // user has freshly connected and is awaiting previous messages.
        // TODO: Deal with channel detection
        if (message.action.command != 'msg'){
            console.log(message.action.data[0].channel);

            var channel = message.action.data[0].channel;

            repo.getByTopic(channel, function(err,res){

                if (Array.isArray(res) && res !== 'undefined'){
                    res.forEach(function(m){
                        console.log(m);
                        // send just to this connection
                        connection.send(m.utf8Data);
                    });
                }
            });
        }


        connections.forEach(function (conn) {
            if (message.id !== conn.id && conn !== connection){
                console.log('sending to %s', conn.id);

                // doing this so that i can just send
                // the message using msg.utf8Data later
                repo.save(message, msg);
                conn.send(msg.utf8Data);


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