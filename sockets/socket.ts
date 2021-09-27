import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosListas } from '../class/usuario-lista';
import { Usuario } from '../class/usuario';


import Server from '../class/server';



// creamos una instancia de usuarios conectados
// para exportarlos
// es la unica instancia que se debería de manejar para la lista de usuario
export const usuarioConectados = new UsuariosListas();


export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
    
    // console.log('cliente nuevo: ', cliente);
    // instanciar un usuario, agregando el id del cliente y la ip real de donde se conectan
    const usuario = new Usuario(cliente.id, cliente.handshake.headers['x-real-ip']);

    // insertamos el usuario en el server (patron singleton)
    const server = Server.instance;
    server.usuariosConectados.agregar(usuario);
    
    // Agregar usuario a la lista
    usuarioConectados.agregar(usuario);

}

export const desconectar = (cliente: Socket, io: socketIO.Server) =>  {
    cliente.on('disconnect', () => {
        console.log('Sockets: Cliente desconectado...');
        // borrar un usuario cuando se desconecta
        usuarioConectados.borrarUsuario(cliente.id);

        // eliminamos el usuario de la lista de conectados (patron singleton)
        const server = Server.instance;
        server.usuariosConectados.borrarUsuario(cliente.id);

        io.emit('usuarios-activos', usuarioConectados.getLista());
    });
}


// configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: { grupos: any}, callback: Function) => {

        // actualizar datos de un usuario
        usuarioConectados.actualizarGrupos(cliente.id, payload.grupos);
        // console.log('configurando usuario: ', payload.nombre);

        // io.emit('usuarios-activos', usuarioConectados.getLista());
        // io.emit('mensaje-nuevo', payload);
        // este mensaje se envia al cliente (Respondiendo del servidor al cliente)
        /*callback({
            ok: true,
            origen: 'Enviado desde el servidor nodejs',
            message: `Usuario ${payload.nombre} configurado`
        });*/
    });
}

// obtener todos los usuarios conectados
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        // mandamos la informacion unicamente a la persona que se está conectado
        io.to(cliente.id).emit('usuarios-activos', usuarioConectados.getLista());
    });
}

// método para encontrar coincidencia de texto en un array
export function filterItems(arr: any, query: string) {
  return arr.filter(function(el: any) {
      return el.indexOf(query) > -1;
  });
}
