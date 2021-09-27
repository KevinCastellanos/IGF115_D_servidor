// Framework express
import express from 'express';
// Puertos de escuchas del servidor
import { SERVER_PORT } from '../global/enviroment';
// importamos socketIo
import socketIO from 'socket.io';
// intermediario entre SocketIO y express
import http from 'http';
// sockets que gestiona a los clientes conectados en la app
import * as socket from '../sockets/socket';
import { UsuariosListas } from './usuario-lista';

export default class Server {

    // Si existe una instancia creada retornaremos la misma instancia
    // con esto aseguramos el patron de diseño SINGLETON
    private static _intance: Server;
    
    // declaramos un objeto del framework a utilizar
    public app: express.Application;
    
    // declaramos los puertos por el cual escuchará las conexiones el servidor
    // Tipo de datos númerico
    public port: number;

    // Socket (Servidor: encargada de emitir eventos o escuchar eventos)
    public io: SocketIO.Server;

    // servidor http-server
    private httpServer: http.Server;

    // instanciamos las clase usuariolista
    public usuariosConectados = new UsuariosListas();
    
    // constructor de la clase
    private constructor() {
        // utilizamos express infraestructura
        this.app = express();
        // http server
        // this.httpServer = new https.Server(this.app);
        this.httpServer = new http.Server(this.app);
        
        // inyectamos el servidor creado en el socketIO
        this.io = socketIO(this.httpServer);
        
        this.port = SERVER_PORT;
    }

    // patron singleton
    // para asegurarnos que solo haya una instancia en todo el proyecto.
    public static get instance() {
        // si ya existe una instancia, regrese esa instancia,
        // sino existe crear una nueva instancia y será unica
        return this._intance || (this._intance = new this());
    }
    // **********************************************************************************************


    // conexion http
    public socketHttp() {
        // console.log('escuchando conexiones-sockets http...');
        // escuchar sockets
        this.io.on('connect', cliente => {
            console.log('Nuevo cliente HTTP (aps.tkontrol.com) conectado');
            
            // console.log('id cliente;', cliente);
            // console.log('id cliente;', cliente.id);
            // console.log('dataCliente: ', cliente.broadcast);


            // Conectar cliente (cuando hace una nueva conexion)
            socket.conectarCliente(cliente, this.io);

            // desconectar cliente
            socket.desconectar(cliente, this.io);

            // configurar usuario
            socket.configurarUsuario(cliente, this.io);

            // Obtener usuarios activos
            socket.obtenerUsuarios(cliente, this.io);
        });
    }

    public start(callback: Function) {
        this.httpServer.listen(this.port, callback());
    }


}