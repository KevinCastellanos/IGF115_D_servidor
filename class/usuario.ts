export class Usuario {

    // id del socket que se está comunicando (obligatorio)
    public id: string;
    public nombre: string;
    public sala:  string;
    public check: boolean;
    public grupos: number[];
    public ip: string;

    constructor(id: string, ip: string) {
        this.id = id;
        this.nombre = 'sin nombre';
        this.sala = 'sin grupo';
        this.check = false;
        this.grupos = [];
        this.ip = ip;
    }
}