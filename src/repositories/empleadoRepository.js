import  db from '../config/fireabase.js'
import EmpleadoModel from '../models/empleadoModel.js'

class EmpleadoRepository {
    async crearEmpleado (data){
        const empleado = await db.collection('empleados').add({
            nombre:data.nombre,
            apaterno:data.apaterno,
            amaterno:data.amaterno,
            direccion:data.direccion,
            telefono:data.telefono,
            ciudad:data.ciudad,
            estado:data.estado,
            usuario:data.usuario,
            password:data.password,
            rol:data.rol,
            imagen:data.imagen
        })
        return empleado.id
    }

    async updateEmpleado (id,data)
    {
        await db.collection('empleados').doc(id).update(data)
    }
    
    async deleteEmpleado(id){
        await db.collection('empleados').doc(id).delete()
    }
    
    async getAllEmpleados(){
        const docs = await db.collection('empleados').get()
        const empleados =[]
        docs.forEach((doc) => {
            const data = doc.data()
            empleados.push(new EmpleadoModel (
                doc.id,
                data.nombre,
                data.apaterno,
                data.amaterno,
                data.direccion,
                data.telefono,
                data.ciudad,
                data.estado,
                data.usuario,
                data.password,
                data.rol,
                data.imagen
            ))
        });
        
        return empleados
    }

    async getEmpleadoById(id){
        const doc = db.collection('empleados').doc(id).get()
        if(!doc.exists){
            return null
        }
        const data = doc.data()
        return new EmpleadoModel (
            doc.id,
            data.nombre,
            data.apaterno,
            data.amaterno,
            data.direccion,
            data.telefono,
            data.ciudad,
            data.estado,
            data.usuario,
            data.password,
            data.rol,
            data.imagen
        )
    }

    async getEmpleadoByUsername(username){
        const empleado = db.collection('empleados').where('usuario','==',username).get()
        
        if(empleado.empty){
            return null
        }
        
        const doc = empleado.docs[0]
        const data = doc.data()
        return new EmpleadoModel (
            doc.id,
            data.nombre,
            data.apaterno,
            data.amaterno,
            data.direccion,
            data.telefono,
            data.ciudad,
            data.estado,
            data.usuario,
            data.password,
            data.rol,
            data.imagen
        )

    }

    async getEmpleadoByRol(rol)
    {
        const docs = await db.collection('empleados').where('rol','==',rol).get()
        const empleados =[]
        docs.forEach((doc) => {
            const data = doc.data()
            empleados.push(new EmpleadoModel (
                doc.id,
                data.nombre,
                data.apaterno,
                data.amaterno,
                data.direccion,
                data.telefono,
                data.ciudad,
                data.estado,
                data.usuario,
                data.password,
                data.rol,
                data.imagen
            ))
        });
        
        return empleados
    }

}

export default EmpleadoRepository