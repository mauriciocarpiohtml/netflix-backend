const UsuarioNetflix = require('../models/usuarioModelo')

async function crearUsuario(req, res){
    const {email} = req.body

    const usuarioDuplicado = await UsuarioNetflix.findOne({email})

    if(usuarioDuplicado){
        return res.status(403).json({msg: 'Usuario ya registrado'})
    }

    try {
        const usuario = new UsuarioNetflix(req.body)
        await usuario.save()
        return res.status(200).json({msg: 'Usuario creado correctamente'})
    } catch (error) {
        console.log(error)
    }
}


async function login(req, res){
    const {email, password} = req.body

    const usuario = await UsuarioNetflix.findOne({email})

    if(!usuario){
      return   res.status(404).json({msg : 'Usuario o contraseñas incorrectas master'})
    }

    // comprobar paswword
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            email: usuario.email,
        })
    }
}

module.exports = {crearUsuario, login}