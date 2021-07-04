const sequelize = require('../conexion');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const moment = require('moment');


const getUsuario = async (req, res) =>{
    try {
        const result = await sequelize.query("select * from usuario", { type: sequelize.QueryTypes.SELECT })
        res.status(200).json({result})
    } catch (error) {
        console.log(`error en la selección: ${error}`)
    }
}

const createUsuario = async (req, res) =>{
    try {
        
        req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);

        const {usuario, nombre , telefono, direccion, contrasena, id_rol}  = req.body

        let array_insert = [ usuario , nombre , telefono , direccion, contrasena, id_rol];
    
        if(!usuario || !nombre || !telefono || !direccion  || !contrasena || !id_rol ) {
            return res.status(400).json({msq: " datos faltantes"})
        }

        const result = await sequelize.query('INSERT INTO`usuario`( `usuario`, `nombre`, `telefono`, `direccion`, `contrasena`, `id_rol`) VALUES( ?, ?, ?, ?, ?, ?)',
        { replacements: array_insert, type: sequelize.QueryTypes.INSERT })

        res.status(200).json({ msq: "Usuario creado con exito" + result})
    } catch (error) {
        console.log(`error en la selección: ${error}`)
    }
}

const login = async (req, res) =>{
    try{
        const { usuario, contrasena} = req.body;
        const result = await sequelize.query(`select * from usuario where usuario = "${usuario}"`, { type: sequelize.QueryTypes.SELECT })
        //res.status(200).json({result})
        
        const validacion = bcrypt.compareSync(contrasena, result[0].contrasena);

        if(!validacion){
            res.status(401).json({msq: "Usuario o Contraseña invalida"})
        } else {
                const payload = {id_usuario: result[0].id_usuario, usuario: result[0].usuario, rol: result[0].id_rol};
                const jwtToken = jwt.sign(payload, process.env.LLAVE, {
                    expiresIn: moment().add(1, 'day').unix(),
                });
                res.status(200).json({
                    msq: "Inicio correcto",
                    token: jwtToken
                })
                
            }
        
    }catch (error) {
        res.status(401).json({msq: "Usuario o Contraseña invalida"})
    }
}

const getUsuarioForId = async (req, res) =>{
    try {
        const {id} = req.params

        if(!id){
            res.status(400).json({msg: "id es obligatorio"})
        }

        const result = await sequelize.query("select * from usuario where id_usuario = " + req.params.id , { type: sequelize.QueryTypes.SELECT })
        res.status(200).json({result})
    } catch (error) {
        res.status(400).json({msq: "Ocurrio un error"})
        console.log(`error en la selección: ${error}`)
    }
}

const updateUsuario = async (req, res) =>{
    
    try {

        req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);

        const {usuario, nombre , telefono, direccion, contrasena}  = req.body
        
        const result = await sequelize.query(`UPDATE usuario 
        SET usuario = "${usuario}", nombre = "${nombre}", telefono = "${telefono}", direccion = "${direccion}", contrasena = "${contrasena}"
        WHERE id_usuario = ${req.params.id}`,
        { type: sequelize.QueryTypes.INSERT })

        console.log(result)
        res.status(200).json({msq: "Usuario actualizado con exito"})

    } catch (error) {
        console.log(`error en la actualización: ${error}`)
    }
}

const deleteUsuario = async (req, res) =>{
    try {
        const result = await sequelize.query(`delete from usuario where id_usuario = ${req.params.id}`)
        res.status(200).json({
            msq: "Usuario Eliminado Con Exito"
        })
    } catch (error) {
        res.status(400).json({msq: "Ocurrio un error"})
        console.log(`error en la eliminación: ${error}`)
    }
}



exports.getUsuario = getUsuario
exports.createUsuario = createUsuario
exports.getUsuarioForId = getUsuarioForId
exports.updateUsuario = updateUsuario
exports.login = login
exports.deleteUsuario = deleteUsuario