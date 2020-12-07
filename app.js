 // 1.CREATE SERVER FOLDER
 // * CREATE APP.JS
 // * NPM INIT -Y IN THE FOLDER
 // * NPM INSTALL EXPRESS

 // log req what all found in the request and req.body what data is send from body
 // .end -> end the response

 const express = require("express");
 const app = express(); //creating a server
 const http = require("http").createServer(app); //creating a port via app same used by socket.io
 const cors = require('cors')
 //  very important for cross pages request
 app.use(cors());
 const io = require("socket.io")(http, {
     //  kahi s bhi request aae aane do
     cors: {
         origin: '*',
     }
 });

 // app.use(express.json())

 //write this line
 // to use postman for api testing whether request all working as expected or not 
 // postman same as chrome request with no ui
 // express is like an api request sendind to the server

 //app request made on /home then run the callback function

 app.get("/", function (request, response) {
     response.send("Welcome to web");
 })

 // http.listen(3000, function () {
 //     console.log("App is listening at 3000 port");
 //     // server started here tget request on 3000 port with /home then do the callback function
 // })

 // docs copy then modify

 //server deployed (app.js is running) whenever an elctron app open with it socket willhave its id
 // but now tell electron app that you are connecting with socket app

 // whenver someone connected to it this event will fire

 io.on('connection', (socket) => {
     console.log(`${socket.id} connected!!!`);
     // on data consumes when this named data is received
     // socket.on("testing", function (data) {
     //     console.log(data);
     // })

     socket.on("mmDrawn", function (eventObj) {
         // socket.broadcast.emit("broadcast", "hello friends!");
         socket.broadcast.emit("mouseMoveReceived", eventObj);
     })
     // https://socket.io/docs/v3/emit-cheatsheet/index.html
     socket.on("mdDrawn", function (eventObj) {
         socket.broadcast.emit("mouseDownReceived", eventObj);
     })

     //  METHOD 2

     //  socket.on("ud", function (linesDB) {
     //      socket.broadcast.emit("undoDoneReceived", linesDB);
     //  })

     //  socket.on("rd", function (redoPoints) {
     //      socket.broadcast.emit("redoDoneReceived", redoPoints);
     //  })

     //  METHOD 1 - NO NEED TO PASS LINESdb SBKE PASS LOCALLY H VOH

     socket.on("ud", function () {
         socket.broadcast.emit("undoDoneReceived", "");
     })

     socket.on("rd", function () {
         socket.broadcast.emit("redoDoneReceived", "");
     })

 });

 // without arrow functions

 // io.on('connection', function (socket) {
 //     console.log('a user connected');
 // });

let port = process.env.PORT || 3000;
 http.listen(port, () => {
     console.log('server is listening at 3000 port');
 });

 /**now both got connected logic for transfer of data 
  * 
  * whenevr mouse point created emit it on the same event here to server receive it then send to all the sockets by putting an emit in the server and on for all the sockets
  * 
  * socket defined on index thus available to all the js files . each app will have it own socket
  */