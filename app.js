const express = require('express');
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express();
const port = 5000;
const sequelize = require('./conexion.js')
const jwt = require("jsonwebtoken");
require('dotenv').config()


//Routes
const routeProducts = require('./routers/products.routes.js')
const routeOrder = require('./routers/order.routes.js')
const usuarioRoute = require('./routers/usuario.routes')
const validatelogin = require('./middlewares/midlewares.js')


//middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//use routes
app.use('/api/products', routeProducts);
app.use('/api/order', routeOrder);
app.use('/api/usuario', usuarioRoute);

app.post("/api/v1/acamica/user", validatelogin.middleLogin , (req, res) => {
    return res.status(200).json(req.body);
});

//servidor
app.listen(port, () => {
    console.log('App iniciada en el puerto '+port);
});