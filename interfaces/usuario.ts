export interface Usuario {
    id_usuario?: number;
    id_grupo?: number;
    token?: any;
    token_creado?: Date;
    token_valido_por?: string;
    token_expira?: Date;
    usuario?: string;
    password?: string;
    nombre?: string;
    apellido?: string;
    email?: string;
    telefono?: string;
    status?: number;
    root?: number;
    cantidad_vehiculo?: number;
    sound_notificacion?: number;
    grupos?: any[];
}