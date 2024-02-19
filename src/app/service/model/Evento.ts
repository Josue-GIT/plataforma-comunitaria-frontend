import { Usuario } from "./Usuario";

export interface Evento {
    id: number;
    titulo: string;
    url: string;
    descripcion: string;
    fechaHora: string;
    ubicacion: string;
    participantes: ParticipacionEvento[];
  }
  
  export interface ParticipacionEvento {
    id: number;
    evento: Evento;
    usuario: Usuario;
    rol: string;
  }
  
