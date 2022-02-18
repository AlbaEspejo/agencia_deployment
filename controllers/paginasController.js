import {Viaje} from '../models/Viaje.js';
import { Testimonios } from '../models/Testimonios.js';


const paginaInicio = async (req,res)=>{ //req = request es lo que enviamos,res = respuesta lo que 
    //express nos devuelve

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit:3}));
    promiseDB.push(Testimonios.findAll({limit:3}));
    //consultamos 3 viajes del modelo de viaje para mostrarlos en la pag de inicio
    try {
        const resultado = await Promise.all(promiseDB)

        res.render('inicio',{
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
            });

    } catch (error) {
        console.log(error)
    }

    
}

const paginaNosotros = (request,respuesta)=>{ //request es lo que enviamos, respuesta lo que 
    //express nos devuelve
respuesta.render('nosotros',{
    pagina: 'Nosotros'
})
}

const paginaViajes = async (request,respuesta)=>{ 
    //CONSULTAMOS LA BASE DE DATOS
    const viajes = await Viaje.findAll();
    
    
    //request es lo que enviamos, respuesta lo que 
    //express nos devuelve
    respuesta.render('viajes',{
    pagina: 'Próximos Viajes',
    viajes,
})
}

const paginaTestimonios = async (request,respuesta)=>{ //request es lo que enviamos, respuesta lo que 
    //express nos devuelve

    try {
        const testimoniales = await Testimonios.findAll();

        respuesta.render('testimonios',{
            pagina: 'Testimonios',
            testimoniales
        })
    } catch (error) {
        console.log(error)
    }

}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req,res) =>{
    
    const {slug} = req.params;

    try {
        const viaje = await Viaje.findOne({where: {slug}});
        res.render('viaje',{
            pagina: 'Información del Viaje',
            viaje
        })

    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViaje
}