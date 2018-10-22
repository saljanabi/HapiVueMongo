var mongojs = require('mongojs');
var db = mongojs('root:root@192.168.0.11/CID', ['HapiVueMongo']);
var HapiVueMongo = db.collection('HapiVueMongo');

db.on('error', function (err) {
    console.log('Unable to connect to Mongo database.', err)
})

db.on('connect', function () {
    console.log('Connection has been established successfully to Mongo database.')
})

module.exports =  {
    Mongoconnector
}