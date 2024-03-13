import { Usuario } from "./Usuario";

export interface Queja{
    id: number;
    titulo: string;
    usuario: Usuario;
    img:string;
    ubicacion: string;
    descripcion: string;
    fechaReporte: string;
    estado: string; 
    reportes : ReporteQueja[];
  }

  export interface ReporteQueja {
    id: number;
    quejaProblema: Queja;
    usuario: Usuario;
    fechaReporte: string;
    mensaje:  string;
  }
  
