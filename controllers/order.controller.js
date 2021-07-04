const sequelize = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require("jsonwebtoken");


const getOrders = async (req, res) => {
    try {
        const data = await sequelize.query('select * from pedido', {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({msq: data});
    }catch (error){
        console.log('error' + error);
    }
}
const getOrdersById = async (req, res) => {
    let id_usuario
    const jwtToken = req.headers["authorization"];
    const jwtClient = jwtToken.split(" ")[1];
    jwt.verify(jwtClient, process.env.LLAVE, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token Expired" });
        }
        id_usuario = decoded.id_usuario

    });
    try {
        const data = await sequelize.query('select * from pedido where id_usuario ='+id_usuario, {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({msq: data});
    }
    catch (error){
        console.log('error' + error);
    }
}

const createOrder = async (req, res) => {
    let id_usuario
    const {descripcion, estado, id_producto} = req.body
    if(!descripcion || !estado || !id_producto){
        res.status(400).json({msg: "Faltan datos"})
    }
    const jwtToken = req.headers["authorization"];
    const jwtClient = jwtToken.split(" ")[1];
    jwt.verify(jwtClient, process.env.LLAVE, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token Expired" });
        }
        id_usuario = decoded.id_usuario

    });
    let array_insert = [descripcion, id_usuario, estado]
    try {
        await sequelize.query('INSERT INTO pedido (descripcion, id_usuario, estado) values (?, ?, ?)', { replacements: array_insert, type: sequelize.QueryTypes.INSERT })
        let contenedor_id_producto = id_producto.split(',');
        createOrderProducts(contenedor_id_producto);
        res.status(200).json({msq: "Creado correctamente"});
    }catch (error){
        console.log('error' + error);
    }
}

async function createOrderProducts(contenedor_id_producto) {
    try {
        const data = await sequelize.query('select * from pedido order by id_pedido desc limit 1', {type: sequelize.QueryTypes.SELECT})
        for (let value of contenedor_id_producto) {
            let array_insert = [parseInt(value), data[0]['id_pedido']]
            try {
                await sequelize.query('INSERT INTO pedidos_producto (id_producto, id_pedido) values (?, ?)', { replacements: array_insert, type: sequelize.QueryTypes.INSERT })
            }catch (error){
                console.log('error' + error);
            }
        }
    }catch (error){
        console.log('error' + error);
    }
}



const deleteOrder = async (req, res) => {
    const {id} = req.query
    if(!id){
        res.status(400).json({msg: "id es obligatorio"})
    }
    try {
        await sequelize.query('delete from pedidos_producto where id_pedido = '+id, {type: sequelize.QueryTypes.DELETE })
        await sequelize.query('delete from pedido where id_pedido = '+id, {type: sequelize.QueryTypes.DELETE })
        res.status(200).json({msq: "Eliminado correctamente"});
    }catch (error){
        console.log('error' + error);
    }
}

const updateOrder = async (req, res) => {
    const {id} = req.query
    const {estado} = req.body
    if(!id){
        res.status(400).json({msg: "id es obligatorio"})
    }else if(!estado){
        res.status(400).json({msg: "Hace falta un estado valido"})
    }
    let array_insert = [estado]
    try{
        await sequelize.query('update pedido set estado = ? where id_pedido = '+id, {replacements: array_insert, type: sequelize.QueryTypes.UPDATE })
        res.status(200).json({msq: "Actualizado correctamente"});
    }catch(error){
        console.log(error);
    }
}

exports.getOrders = getOrders;
exports.getOrdersById = getOrdersById;
exports.createOrder = createOrder;
exports.deleteOrder = deleteOrder;
exports.updateOrder = updateOrder;
