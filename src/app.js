const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const port = 3000

const app = express()


// IMPORT ROUTES
const customerRoutes = require('./routes/customer')

// SETTING
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARE
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crudnodejsmysql'
}, 'single'));
app.use(express.urlencoded({extended:false}));

// ROUTES
app.use('/', customerRoutes);

// STATIC FILES
app.use(express.static(path.join(__dirname,'public')));

// STARTING SERVER
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))