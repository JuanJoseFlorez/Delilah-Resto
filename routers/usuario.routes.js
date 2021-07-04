const express = require('express')
const router = express.Router()
//const multer = require('multer')
//const upload = multer({dest: 'mysql://root:@localhost:3306/bandas'})
const usuarioController = require('../controllers/usuario.controller.js');
const midlewares = require('../middlewares/midlewares')

router.get('/user', midlewares.middleLogin, usuarioController.getUsuario);

router.post('/registro', usuarioController.createUsuario);

router.post('/login', usuarioController.login);

router.get('/user/id/:id', midlewares.middlewareById, midlewares.middleLogin, usuarioController.getUsuarioForId);

router.put('/user/id/:id', midlewares.middlewareById, midlewares.middleLoginUser, usuarioController.updateUsuario);

router.delete('/user/id/:id', midlewares.middlewareById, midlewares.middleLogin, usuarioController.deleteUsuario);


module.exports = router