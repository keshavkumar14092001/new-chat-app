const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log(`The Server is running at PORT ${PORT}`);
})

// Socket Configuration:
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    let number = io.engine.clientsCount;
    console.log(number)
    socket.on('sendMessage', (msg) => {
        socket.broadcast.emit('sendToAll', msg)
    })
    io.emit('totalCount', number)
})