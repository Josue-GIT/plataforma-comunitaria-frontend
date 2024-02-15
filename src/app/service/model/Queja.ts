import { Usuario } from "./Usuario";

export interface Queja{
    id: number;
    titulo: string;
    usuario: Usuario;
    url: string;
    ubicacion: string;
    descripcion: string;
    fechaReporte: string;
    estado: string;    
  }