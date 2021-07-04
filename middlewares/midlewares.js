require('dotenv').config()
const jwt = require("jsonwebtoken");

const middleLogin = (req, res, next) => {
    const jwtToken = req.headers["authorization"];
    // bearer mitoken
    if (!jwtToken) {
        return res.status(401).json({ message: "No Autorizado" });
    }
    const jwtClient = jwtToken.split(" ")[1];
    jwt.verify(jwtClient, process.env.LLAVE, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token Expired" });
        }
       
        if(decoded.rol == 2 ){
            // solo usuarios admin pueden pasar
            return res.status(401).json({ message: "No Autorizado" });
        }
        
        next();
    });
};

const middleLoginUser = (req, res, next) => {
    const jwtToken = req.headers["authorization"];
    // bearer mitoken
    if (!jwtToken) {
        console.log(jwtToken)
        return res.status(401).json({ message: "Debe Iniciar Sesión" });
    }
    const jwtClient = jwtToken.split(" ")[1];
    jwt.verify(jwtClient, process.env.LLAVE, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token Expirado" });
        }

        next();
    });
};





const middlewareById =  (req, res, next) => {
    let {id} = req.params
    console.log(id)
    if(id && isNaN(parseInt(id))){
        return res.status(400).json({message: "tipo no valido para el id"})
    } else {
        next();
    }
}


exports.middleLogin = middleLogin
exports.middlewareById = middlewareById
exports.middleLoginUser = middleLoginUser
