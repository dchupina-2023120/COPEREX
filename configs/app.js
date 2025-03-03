//Levantar servidor express (HTTP)

//Modular | + efectiva + legible | trabaja en funciones

'use strict'

//ECModules | ESModules
import express from 'express' //Servidor HTTP
import morgan from 'morgan' //Logs
import helmet from 'helmet' //Seguridad para HTTP
import cors from 'cors' //Acceso al API

import userRoutes from "../src/user/user.routers.js"
import companyRoutes from "../src/company/company.routes.js"

import dotenv from 'dotenv';
import { limiter } from '../middleware/rate.limit.js'
dotenv.config(); // <-- Asegura que .env se cargue correctamente

//Configuraciones de express metidas en una función
const configs = (app)=>{
    app.use(express.json()) //Aceptar y enviar datos en JSON
    app.use(express.urlencoded({extended: false})) //No encriptar la URL
    app.use(cors()) //Antes que los demás que vienen bajo este. (Políticas de seguridad)
    app.use(helmet()) //Seguridad de express (HTTP)
    app.use(morgan('dev')) //Gestionador de Logs (dev: )
    app.use(limiter)
}

//Cuando tengamos rutas.
//  Carga de rutas
const routes = (app) => {
    app.use('/api/users', userRoutes); // Rutas de usuarios
    app.use('/api/company', companyRoutes )
   
};

//Ejecutamos el servidor
export const initServer =  ()=>{
    //Crear instancia de express
    const app = express()//Instancia de express
    try {
                //servidor : app.
        configs(app)
        routes(app)
                //puerto en el que corre: 2636.
        app.listen(process.env.PORT)
                //Impresión sobre el puerto en el que corre.
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
            //Impresión del fallo de inicialización del servidor, impresión del error.
        console.error('Server init failed', err)
        process.exit(1); // Cierra el proceso si hay error
    }
}