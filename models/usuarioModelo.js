const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const Usuario = mongoose.Schema({

    email:{
        type: String,
        require: true,
        unique: true
    },

    password:{
        type: String,
        require: true
    },
    
})

// hashear password

Usuario.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }


    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)
})

Usuario.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password)
}


const UsuarioNetflix = mongoose.model('UsuarioNetflix', Usuario)

module.exports = UsuarioNetflix