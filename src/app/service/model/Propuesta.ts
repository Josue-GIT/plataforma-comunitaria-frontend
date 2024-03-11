import { Usuario } from "./Usuario";

export interface Propuesta {
  votos: number | { cantidadVotosPositivos: number };
    id: number;
    usuario: Usuario;
    img: string;
    titulo: string;
    descripcion: string;
    ubicacion: string
    
  }