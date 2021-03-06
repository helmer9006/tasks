const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //leer el token el header

    const token = req.header('x-auth-token');
    console.log(token);

    //revisar si no hay token 
    if(!token){
        return res.status(401).json({msg: 'No hay Token, permiso no valido'});
    }

    //validar el token
    
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA)
        req.user = cifrado.usuario;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({msg:'Token no valido'})
    }

}