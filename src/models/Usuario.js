// @flow

const mongoose = require('mongoose')

const UsuarioSchema = mongoose.Schema({
    nombre:{type:String, required:true, trim:true},
    apellido:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true, unique:true},
    password:{type:String, required:true, trim:true},
    creado:{type:Date, default:Date.now()}
})

export type UsuarioInsertType = {
    nombre: string,
    apellido: string,
    email: string,
    password: string
}

module.exports = mongoose.model('Usuario', UsuarioSchema)

