/**
 * Created by max on 26.01.16.
 */

var redis = require('redis');
var client = redis.createClient();



var repo = function(){

    var save = function (msg){

        var messageList = [];

        // prefetch previous messages.
        client.get(msg.action.data[0].channel, function(err, res){
            if (Array.isArray(res)){
                messageList = res;
            }

            messageList.push(msg);

            // overwrite the existing key: value pair with updated list
            client.(msg.action.data[0].channel, messageList, function(err,res){
                //console.log(res);
            });
        });
    };

    var get = function(id){

    };

    var getByTopic = function (topic, cb){

        client.get(topic, function(err, res){
                 cb(null, res);
            });
    };

    return {
        save: save,
        get: get,
        getByTopic:getByTopic
    }
};

module.exports = repo();