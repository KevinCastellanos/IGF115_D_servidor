// archivo destinado a crear los api Rest
import { Router, Request, Response } from 'express';
import Server from '../class/server';


//exportamos la constante router
export const router = Router();


// nueva ruta con parametros
router.get('/mensajes', (req: Request, res: Response) => {
    res.json({status: 'servidor funcionando correctamente'});
});
// nueva ruta con parametros
router.post('/mensajes/:id', (req: Request, res: Response) => {
    // leer la informacion que estoy recibiendo desde el cliente
    console.log(' api con parametros');
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    // obtener el id
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    };

    // Aqui tenemos que agregar nuestro servicio rest con el servidor de sockets
    // para que la app obtenga los mensaje en tiempo real
    // declaramos la instancia de nuestro server

    // como usa el patron singleton, es la misma instancia del servidor de sockets corriendo
    // const server = Server.instance;

    // nos vamos a referir a nuesro servidor de sockets
    // el in sirve para enviar mensaje a un cliente en una canal en paticular
    // server.io.in( id ).emit('mensaje-privado', payload);
    const server = Server.instance;
    /*for (const usuario of server.usuariosConectados.usuariosConectados()) {
        server.io.to(usuario.id).emit('mensaje-privado', usuarioConectados.getLista());
    }*/

    // server.io.emit('mensaje-privado', usuarioConectados.getLista());

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

