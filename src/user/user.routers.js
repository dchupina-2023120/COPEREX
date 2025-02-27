import { Router } from "express";
import { validateJwt } from "../../middleware/validate.jwt.js";
import { login, test } from '../user/user.controller.js';
import { loginValidator} from "../../middleware/validators.js"

const api = Router();


// Ruta para iniciar sesión
api.post('/',
    [
        //loginValidator
        
    ],login
);

// Ruta de prueba
api.get('/test', 
    [
        validateJwt

    ],test
);

export default api;