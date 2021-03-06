import { Usuario } from './usuario';

export class UsuariosListas {

    //Creamos un aray 
    private lista: Usuario[] = [];

    constructor() {

    }

    // Agregar un nuevo usuario (usuario ya debe de estar creado para insertarlo en la lista)
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        //console.log(this.lista);
        
        return usuario;
    }

    public actualizaNombre(id: string, nombre: string) {
        // recorremos la lista de usuario
        for(let usuario of this.lista) {
            if(usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        //console.log('========== Actualizando usuario ============');
        //onsole.log(this.lista);
    }

    public actualizarGrupos(id: string, grupos: number[]) {
        // recorremos la lista de usuario
        for(let usuario of this.lista) {
            if(usuario.id === id) {
                usuario.grupos = grupos;
                break;
            }
        }
        //console.log('========== Actualizando usuario ============');
        //onsole.log(this.lista);
    }

    public setStatus(id: string, status: boolean) {
        
        for(let usuario of this.lista) {
            if(usuario.id === id) {
                usuario.check = status;
                break;
            }
        }
    }

    // Obtener lista de usuario conectado
    public getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    // obtener un usuario
    public getUsuario(id: string) {
        return this.lista.find(usuario => usuario.id === id);
    }

    // obtener usuarios en una sala en particular
    public getUsuarioEnSala(salaNombre: string) {
        return this.lista.filter(usuario => usuario.sala === salaNombre);
    }

    // borrar usuario del chat
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        // console.log(this.lista);
        return tempUsuario;
    }

    public usuariosConectados(): Usuario[] {
        return this.lista;
    }
}