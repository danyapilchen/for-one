const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server,{pingTimeout:30000,pingInterval:10000})

const port = process.env.PORT||3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

let connection = [];
let admin;

io.on('connection',(socket)=>{
    console.log(`New connecting ${socket.id}`)
    
    socket.on('client',(callback)=>{
        if(connection.indexOf(socket)===-1){
            connection.push(socket)
            if(admin){
                admin.emit('clientCount',connection.length);
            }
            console.log(connection.length)
        }
        callback();
    })

    socket.on('randomMessage',()=>{
        if(connection.length>0){
            socket.broadcast.emit('flash','');
            const rand = Math.floor(Math.random()*connection.length);
            connection[rand].emit('message','');
        }
    })
    socket.on('admin',(callback)=>{
        admin = socket;
        callback(connection.length)
    })
   
    socket.on('disconnect', ()=>{
        if(connection.indexOf(socket)!==-1){
            connection.splice(connection.indexOf(socket),1)
            if(admin){
                admin.emit('clientCount',connection.length)
            }
            console.log(connection.length);
        }
        if(admin){
            if(admin.id === socket.id){
                admin= undefined
            }
        }
    })
})


server.listen(port,()=>{
    console.log(`Server is up on port: ${port}`)
})