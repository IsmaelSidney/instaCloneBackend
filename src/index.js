const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket =>{
    socket.on('connectRoom', posts => {
        socket.join(posts);
    })
})
mongoose.connect(
    'mongodb+srv://admin:admin@cluster0-yfmw4.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
});

app.use((req,res, next)=>{
    req.io = io ;

    next();
})

app.use('/files', express.static(path.resolve(__dirname,'..','uploads','resized')));
app.use(express.urlencoded({extended : true}));
app.use(require('./routes'));

server.listen( process.env.PORT || 3000);