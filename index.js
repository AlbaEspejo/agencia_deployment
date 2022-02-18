//importamos express
import express from 'express';
import router from "./routes/index.js";
import db from './config/db.js';


const app = express();

//conectamos la base de datos
db.authenticate()
    .then( ()=>{
        console.log('Base de datos conectada')
    })
    .catch(error => console.log(error))
    

//Definimos el puerto
const port = process.env.port || 4000;

//Habilitamos pug
app.set('view engine', 'pug');

//Obtener el año actual
app.use((request,respond,next)=>{
    const year = new Date();

    respond.locals.añoActual = year.getFullYear();
    respond.locals.nombreSitio = "Agencia de Viajes";

    return next();

})

//Agregamos el body parset para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

//Definimos la carpeta pública
app.use(express.static('public'));

//Agregamos el router
app.use('/',router);


app.listen(port, ()=>{
    console.log(`El servidor está funcionando en el puerto ${port}`)
})