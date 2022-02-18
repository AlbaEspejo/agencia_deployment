
import { Testimonios } from "../models/Testimonios.js";

const guardarTestimonio = async (req,res)=>{

    //validamos el formulario
    const {nombre,email,mensaje} = req.body;

    const errores = [];

    if(nombre.trim()=== ''){
        errores.push({mensaje: 'El nombre está vacío'})
    }

    if(email.trim()=== ''){
        errores.push({mensaje: 'El email está vacío'})
    }

    if(mensaje.trim()=== ''){
        errores.push({mensaje: 'El mensaje está vacío'})
    }

    if(errores.length >0){
        //consultamos los testimonios existentes
        const testimoniales = await Testimonios.findAll();

        //mostramos la lista con los errores
        res.render('testimonios',{
            pagina: 'testimonios',
            errores,
            nombre,
            email,
            mensaje,
            testimoniales
        })
    }else{
        //almacenamos los datos en la base de datos
        try {
            await Testimonios.create({
                nombre,
                email,
                mensaje
            });
            res.redirect('/testimonios');

        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimonio
}