/**
 * Created by max on 26.01.16.
 */
var express = require('express');
var bodyParser  = require('body-parser');
var exphbs  = require('express-handlebars');

module.exports = function(app, config){

    app.engine('handlebars', exphbs({
        layoutsDir: config.root + '/client/views/layouts/',
        defaultLayout: 'main',
        partialsDir: [config.root + '/client/views/partials/']
    }));

    app.set('views', config.root + '/client/views');
    app.set('view engine', 'handlebars');
    app.use(express.static(config.root + '/public'));



};