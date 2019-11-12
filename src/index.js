const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
    'mongodb+srv://omnistack:omnistack@cluster0-yfmw4.mongodb.net/omnistack8?retryWrites=true&w=majority',{
    useNewUrlParser: true
});

app.use((req,res, next)=>{
    req.io = io ;

    next();
})

app.use('/files', express.static(path.resolve(__dirname,'..','uploads','resized')));
app.use(require('./routes'));

server.listen( process.env.PORT || 3333);