import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const sendPasswordResetEmail= async (email,resetURL) =>{
    await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:email,
        subject:'Restablecer Contraseña',
        html: 
        `
        <p>Haga click para resetear su password <a href='${resetURL}'>Restablecer<a/> </p>
        `

    })
}