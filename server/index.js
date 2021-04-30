var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


io.on('connection', function (socket) {
    socket.emit('hello');
})

app.get('/',function (req, res){
    res.send('Hello');
});



server.listen(3000);







/*
const fcm = require('fcm-notification');
const FCM = new fcm("./chat-b8ff3-firebase-adminsdk-riay1-6d41172006.json")
const AndroidToken = "eDt-_DEgRPiW4t-hA8al3p:APA91bEe9qElsUSH9nHjts7SveUcKV0v9seV1IwMEUeXJzfoCbht7xzW48GFOZ-D9lvJLGDEcIxuEA0IwQ3wqRycjsjXpWSPqQHnGDfdiYZRKUQR6Oq2DUxCUXBy40Ib33DrLEPjE6_r";
var message = {
    notification:{
        title : 'Title of notification',
        body : 'Body of notification'
    },
    token : AndroidToken
};
FCM.send(message, function(err, response) {
    if(err){
        console.log('error found', err);
    }else {
        console.log('response here', response);
    }
})
*/



