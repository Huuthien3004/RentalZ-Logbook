const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
require('./models/item');


app.use(cors());
app.options('*', cors())

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

//Routes
const itemsRoutes = require('./routes/items');
const api = process.env.API_URL;

app.use(`${api}/items`, itemsRoutes);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'RentalZ'
})
.then(()=>{
    console.log('Database is connected!')
})
.catch((err)=> {
    console.log(err);
})

// Server
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})

