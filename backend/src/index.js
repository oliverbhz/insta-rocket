const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://semana:semana@omnistack-dw2vz.mongodb.net/insta-rocket?retryWrites=true&w=majority', {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('DB Connected!'))
    .catch(err => {console.log(`DB Connection Error: ${err.message}`);
});

app.use((req, res, next) => {
    req.io = io;

    next();
})

app.use(cors());
 
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'));

server.listen(3333);
