import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../model/Proyecto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = 'http://localhost:8080/proyectos';

  constructor(private http: HttpClient) { }

  obtenerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.apiUrl}/listar`);
  }

  registrarProyecto(proyecto: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardar`, proyecto);
  }

  editarProyecto(proyectoId: number, proyecto: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar/${proyectoId}`, proyecto);
  }
  
  eliminarProyecto(proyectoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${proyectoId}`);
  }
}
