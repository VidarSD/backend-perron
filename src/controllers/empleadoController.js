import e, { response } from 'express';
import EmpleadoService from '../services/empleadoService.js'
import { validationResult } from 'express-validator'

const empleadoService = new EmpleadoService();

const handleValidationsError = (request,response,next) => {
    const errors = validationResult(request)
    if(!error.isEmpty())
    {
        return response.status(400).json({
            errors:errors.array()
        })
    }
    next()
}

const createEmpleado = async (request,response)=>{
    handleValidationsError(request)

    try {
        const empleadoID = await empleadoService.createEmplado(request.body,request.file)
        return response.status(200).json({success : true ,empleadoID})
    } catch (error) {
        return response.status(400).json({
            success:false,
            message: error.message

        })
    }
}

const updateEmpleado = async (request,response) => {
    handleValidationsError(request)
    try {
        const id = request.params.id
        await empleadoService.updateEmpleado(id,request.body,request.file)
        return response.status(200).json({success : true })
    } catch (error) {
        return response.status(400).json({
            success:false,
            message: error.message

        })
    }
}

const deleteEmpleado = async (request,response) => {
    handleValidationsError(request)
    try {
        const id = request.params.id
        await empleadoService.deleteEmpleado(id)
        return response.status(200).json({success : true })

    } catch (error) {
        return response.status(400).json({
            success:false,
            message: error.message

        })
    }
}

const getAllEmpleados = async (request, reponse) => {
    try {
        const empleados = await empleadoService.getAllEmpleados()
        return response.status(200).json({success : true,empleados})


    } catch (error) {
        return response.status(400).json({
            success:false,
            message: error.message

        })
    }
}

const getEmpleadoById = async (request,response) =>
{
    handleValidationsError(request)
    try {
        const id = request.params.id
        const empleado = empleadoService.getEmpleadoById(id)
        if(!empleado)
        {
            return response.status(404).json({
                success:false,
                message: 'Emplaedo NOT FOUND'  
            })
        }else{

            return response.status(200).json({success : true,empleado})

        }
    } catch (error) {
        return response.status(400).json({
            success:false,
            message: error.message

        })
    }

}

const getEmpleadoByUserName = async (request,response) =>
    {
        handleValidationsError(request)
        try {
            const userName = request.params.username
            const empleado = empleadoService.getEmpleadoByUserName(userName)
            if(!empleado)
            {
                return response.status(404).json({
                    success:false,
                    message: 'Emplaedo NOT FOUND'  
                })
            }else{
    
                return response.status(200).json({success : true,empleado})
    
            }
        } catch (error) {
            return response.status(400).json({
                success:false,
                message: error.message
    
            })
        }
    
    }

const getEmpleadoByRol = async (request,response) =>
        {
            handleValidationsError(request)
            try {
                const userRol = request.params.rol
                const empleado = empleadoService.getEmpleadoByRol(userRol)
                if(!empleado)
                {
                    return response.status(404).json({
                        success:false,
                        message: 'Emplaedo NOT FOUND'  
                    })
                }else{
        
                    return response.status(200).json({success : true,empleado})
        
                }
            } catch (error) {
                return response.status(400).json({
                    success:false,
                    message: error.message
        
                })
            }
        
        }

export {
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
    getAllEmpleados,
    getEmpleadoById,
    getEmpleadoByRol,
    getEmpleadoByUserName
}