export interface QuejaRequest {
  usuario:{id:number}
  ubicacion: string;
  titulo: string;
  url: string;
  descripcion: string;
  estado: string;
}