/***************************************************************************************************************/
//
// Server: servidor encargado de manejar el protocolo TCP, UDP, HTTP
//
/**************************************************************************************************************/
import Server from './class/server';
// puertos que se habilita al servidor socket
import { SERVER_PORT } from './global/enviroment';
// importamos los router par tener manejos de las api rest 
import { router } from './routes/router';
// Extrae toda la parte del cuerpo de un flujo de solicitud entrante y lo expone en req.body
import bodyParser from 'body-parser';
// mecanismo que permite que se puedan solicitar recursos restringidos (como por ejemplo, las tipografías)
// en una página web desde un dominio fuera del dominio que sirvió el primer recurso
import cors from 'cors';
// no son apostrofes, son backticks para poder hacer inyecciones de variables en las cadena de textos
// console.log(`mensajes: ${ variable }`);
import * as mysql from './database/sql';

var helmet = require('helmet');

// Instanciamos un nuevo servidor de tipo Server
// utilizando el patron singleton
const server = Server.instance;

// inicializamos el socket http index cambiado
server.socketHttp();

// helmet
server.app.use(helmet());

// bodyParser
// para leer la informacion del frontend al backend se usa bodyparse
// importante que sea antes de la ruta
server.app.use( bodyParser.urlencoded({extended: true}) );

// pasar la informacion a un formato json
server.app.use( bodyParser.json() );

// Configuramos el cors
server.app.use(cors({origin: true, credentials: true}));

// Definimos el path de la aplicacion
// Rutas de servicios
server.app.use('/', router);

// inicializamos el servidor
server.start( () => {
    console.log(`Servidor http corriendo en el puerto: ${ SERVER_PORT }`);
});

