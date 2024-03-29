import { Usuario } from "./Usuario";

export interface Evento {
    id: number;
    titulo: string;
    descripcion: string;
    fechaHora: string;
    ubicacion: string;
    img: string;
    participantes: ParticipacionEvento[];
  }
  
  export interface ParticipacionEvento {
    id: number;
    evento: Evento;
    usuario: Usuario;
    rol: string;
  }
  
