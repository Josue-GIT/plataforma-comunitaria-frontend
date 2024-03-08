import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportarQuejaService {
  private apiUrl = 'http://localhost:8080/reportes-queja';
  private usuarioUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) { }

  obtenerReportesQueja(): Observable<any[]> {
    const url = `${this.apiUrl}/listar`;
    return this.http.get<any[]>(url);
  }

  crearReporteQueja(reporteQueja: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear`, reporteQueja);
  }

  obtenerReporteQuejaPorIdQueja(quejaId: number): Observable<any[]> {
    const url = `${this.apiUrl}/listar/queja/${quejaId}`;
    return this.http.get<any[]>(url);
  }
  
  vetarUsuario(id: number): Observable<any> {
    const url = `${this.usuarioUrl}/vetar/${id}`;
    return this.http.put<any>(url, {});
  }
  
  quitarVetoUsuario(id: number): Observable<any> {
    const url = `${this.usuarioUrl}/quitar-veto/${id}`;
    return this.http.put<any>(url, {});
  }
}
