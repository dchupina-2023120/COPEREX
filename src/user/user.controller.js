import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'


//Registrar
export const register = async(req, res)=>{
    try {
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.role = 'ADMIN'
        await user.save()

        return res.send({message: `Registrado con exito , se puede registrar con nombre de usuario: ${user.username}`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error general con el registro del usuario', err})
    }
}


export const login = async(req, res)=>{
    try {
        let { userLoggin, password } = req.body
        let user = await User.findOne(
            {
                $or: [
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        )
        if(user && checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }

        return res.status(400).send(
            {
                message: 'Wrong email or password'
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error with login function'
            }
        )
    }
}


const agregarUsuarioPorDefecto = async () => {
    try {
        const defaultAdmin = await User.findOne({ role: 'ADMIN' })
    if (!defaultAdmin) {
             const usuarioAdmin = new User({
                name: 'Diego Andre ',
                surname: 'Chupina Mendez',
                username: 'dchupina ',
                email: `${process.env.ADMIN_EMAIL}`,
                password: await encrypt(`${process.env.ADMIN_PASSWORD}`, 12),
                role: "ADMIN",
            })
 
            await usuarioAdmin.save();
            console.log("Usuario administrador por defecto agregado");
        }
    }catch (err) {
            console.error("Error al agregar usuario por defecto:", 
            err
        )
    }
}

agregarUsuarioPorDefecto()


export const test = (req, res)=>{
    console.log('La prueba se esta ejecutando ')
    res.send({message: 'La prueba se esta ejecutando'})
}