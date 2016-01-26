/**
 * Created by max on 26.01.16.
 */
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

var config = {
    port		: 8080,
    root: rootPath
};

module.exports = config;