
const express = require('express');
const helmet = require('helmet');
const app = express();
const genres = require('./routes/genre')






app.use(express.json());
app.use('/api/genres',genres);
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());



// Listening the port
const port = process.env.PORT || 4000;
app.listen(port,()=>console.log(`Listening in port ${port}....`));
