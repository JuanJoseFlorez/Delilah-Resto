const sequelize = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require("jsonwebtoken");

const getProducts = async (req, res) => {
    try {
        const data = await sequelize.query('select * from productos', {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({msq: data});
    }catch (error){
        console.log('error' + error);
    }
}

const createProduct = async (req, res) => {
    const {nombre, precio, descripcion} = req.body
    if(!nombre || !precio || !descripcion){
        res.status(400).json({msg: "Faltan datos"})
    }
    let array_insert = [nombre, precio, descripcion]
    try {
        await sequelize.query('INSERT INTO productos (nombre, precio, descripcion) values (?, ?, ?)', { replacements: array_insert, type: sequelize.QueryTypes.INSERT })
        res.status(200).json({msq: "Creado correctamente"});
    }catch (error){
        console.log('error' + error);
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.query
    if(!id){
        res.status(400).json({msg: "id es obligatorio"})
    }
    try {
        await sequelize.query('delete from productos where id_producto = '+id, {type: sequelize.QueryTypes.DELETE })
        res.status(200).json({msq: "Eliminado correctamente"});
    }catch (error){
        console.log('error' + error);
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.query
    const {nombre, precio, descripcion} = req.body
    if(!id){
        res.status(400).json({msg: "id es obligatorio"})
    }else if(!nombre || !precio || !descripcion){
        res.status(400).json({msg: "Faltan datos"})
    }
    let array_insert = [nombre, precio, descripcion]
    try{
        await sequelize.query('update productos set nombre = ?, precio = ?, descripcion = ? where id_producto = '+id, {replacements: array_insert, type: sequelize.QueryTypes.UPDATE })
        res.status(200).json({msq: "Actualizado correctamente"});
    }catch(error){
        console.log(error);
    }
}

exports.getProducts = getProducts;
exports.createProduct = createProduct;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
