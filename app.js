const express =  require("express");
const app = express();
const http = require('http')
const server = http.createServer(app);
const path = require('path');




const socketIo = require('socket.io')

const io = socketIo(server) 


server.listen(80,() => {
    console.log('running')
})

app.use(express.static(__dirname + "/public"))

let historico = []

io.on('connection', (socket) => {

    
    historico.forEach(linha =>{
        socket.emit('desenhar', linha)
    })

    socket.on('desenhar', (linha) => {
        console.log('as')
        historico.push(linha)
        io.emit('desenhar',linha)
    })
    socket.on('clear',() =>{
        console.log('limpa')
        historico = [];
        io.emit('clear')
    })
})