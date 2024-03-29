import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VotosPropuesta } from '../model/VotosPropuesta';
@Injectable({
  providedIn: 'root'
})
export class VotosPropuestaService {
  private apiUrl = 'http://localhost:8080/vpropuestas';

  constructor(private http: HttpClient) {}

  obtenerVotosPositivosPorPropuesta(idPropuesta: number): Observable<number> {
    const url = `${this.apiUrl}/cantidadVotosPositivos/${idPropuesta}`;
    return this.http.get<number>(url);
  }

  votarPropuestaPositivo(idPropuesta: number, idUsuario: number): Observable<any> {
    const url = `${this.apiUrl}/votar/${idPropuesta}/${idUsuario}`;
    return this.http.post(url, {});
  }

  cancelarVotoPositivo(idPropuesta: number, idUsuario: number): Observable<any> {
    const url = `${this.apiUrl}/cancelarVoto/${idPropuesta}/${idUsuario}`;
    return this.http.delete(url);
  }
}
