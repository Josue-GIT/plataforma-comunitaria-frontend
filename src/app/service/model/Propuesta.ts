import { Usuario } from "./Usuario";

export interface Propuesta {
  votos: number | { cantidadVotosPositivos: number };
    id: number;
    usuario: Usuario;
    url: string;
    titulo: string;
    descripcion: string;
    
  }