import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import EmpleadoRepository from '../repositories/empleadoRepository.js'
import EmpleadoModel from '../models/empleadoModel.js'
import {sendPasswordResetEmail} from '../utils/emailService.js'

const empleadoRepository = new EmpleadoRepository ()
const secret = process.env.JWT_SECRET
const saltRound = 10

class EmpleadoService {
    async createEmpleado (data,file) {
        const existEmpleado = await empleadoRepository.getEmpleadoByUsername(data.username)
        if(existEmpleado)
        {
            throw new Error('El username ya existe')
        }
        const hashedPass = await bcrypt.hash(data.password,saltRound)

        const newEmpleado = new EmpleadoModel(
            null,
            data.nombre,
            data.apaterno,
            data.amanterno,
            data.direccion,
            data.telefono,
            data.ciudad,
            data.estado,
            data.username,
            hashedPass,
            data.rol,
            null
        )
        const empleadoID  = await empleadoRepository.createEmpleado(newEmpleado)
        if(file)
        {
            const imageName =`${empleadoID}_image.png`
            const imagePath  = path.join('src','userImages',imageName)
            fs.writeFileSync(imagePath,file.buffer)
            await empleadoRepository.updateEmpleado(empleadoID,{imagen : imageName})
        }
        return empleadoID

        


        

    }

    async updateEmpleado(id,data,file){
        const existEmpleado= await empleadoRepository.getEmpleadoById(id)
        if(!existEmpleado){
            throw new Error('Empleado no Encontrado')
        }
        if(data.password){
            data.password=await bcrypt.hash(data.password,saltRound)

        }
        if(file){
            const imageName =`${id}_image.png`
            const imagePath = path.join('src','userImages',imageName)
            fs.writeFileSync(imagePath,file.buffer)
            data.image=imageName
        }
        await empleadoRepository.updateEmpleado(id,data)
    }

    async deleteEmpleado(id){
        const existEmpleado= await empleadoRepository.getEmpleadoById(id)
        if(!existEmpleado){
            throw new Error('Empleado no Encontrado')
        }
        await empleadoRepository.deleteEmpleado(id)
    }

    async getAllEmpleados(){
        return await empleadoRepository.getAllEmpleados()
    }
    async getEmpleadoById(id){
        return await empleadoRepository.getEmpleadoById(id)
    }
    async getEmpleadoByUsername(username)
    {
        return await empleadoRepository.getEmpleadoByUsername(username)
    }
    
    async getEmpleadoByRol(rol)
    {
        return await empleadoRepository.getEmpleadoByRol(rol)
    }

    async generatePassswordResetToken(usuario){
        existEmpleado = await getEmpleadoByUsername(usuario)
        if(!existEmpleado){
            throw new Error('Usuario no Existe')
        }

        const token= jwt.sign({id:existEmpleado.id},secret,{expiresIn:'1h'})
        const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`

        await sendPasswordResetEmail(existEmpleado.usuario,resetURL)
    }

    async resetPassword(token,newPassword){
        try {
            const decoded =jwt.verify(token,secret)
            const hashedPass = await bcrypt.hash(newPassword,saltRound)
            await empleadoRepository.updateEmpleado(decoded.id,{password: hashedPass})

        } catch (error) {
            throw new Error ('Token invalido o expirado')
        }
    }
}

export default EmpleadoService