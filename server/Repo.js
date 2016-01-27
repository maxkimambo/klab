/**
 * Created by max on 26.01.16.
 */

var redis = require('redis');
var client = redis.createClient();



var repo = function(){

    var save = function (msg, payload){

        var messageList = [];

        // prefetch previous messages.
        client.get(msg.action.data[0].channel, function(err, res){
            var data = JSON.parse(res);

            if (Array.isArray(data)){
                messageList = data;
            }
            messageList.push(payload);
            var topic = msg.action.data[0].channel;

            // overwrite the existing key: value pair with updated list
            client.set(topic, JSON.stringify(messageList),  function(err,res){

                if(res){
                    var lifetime = 24*60*60;
                    // set the lifetime of the object.
                    client.expire(topic, lifetime );
                    console.log('set expiry to %s', lifetime);
                }

            });
        });
    };

    var get = function(id){

    };

    var getByTopic = function (topic, cb){

        client.get(topic, function(err, res){
            var data = JSON.parse(res);
                 cb(null, data);
            });
    };

    return {
        save: save,
        get: get,
        getByTopic:getByTopic
    }
};

module.exports = repo();