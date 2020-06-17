// @flow
import type {UsuarioInsertType} from '../models/Usuario'

const Usuario = require('../models/Usuario')
const {tryCatch} = require("ramda");

type PWE<T> = Promise<T | Error>

const resolverNuevoUsuario =
    async (_:?any, {input}:{input:UsuarioInsertType}):
        PWE<Usuario> => {
    // revisar si el usuario esta ya esta registrado
    let {email} = input

    //hashear el password
    const existeUsuario = await Usuario.findOne({email})
    if(existeUsuario){
        throw new Error('User already exists')
    }

    return tryCatch((x) => {return new Usuario(x).save()},
        (_) => {throw new Error('Error al guardar usuario nuevo')} )(input)

}

const resolvers = {
    Query: {
        obtenerCurso: () => "Algo"
    },
    Mutation: {
        nuevoUsuario: resolverNuevoUsuario
    }
}

module.exports = resolvers
