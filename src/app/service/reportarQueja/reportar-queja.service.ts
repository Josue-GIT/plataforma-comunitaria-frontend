import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportarQuejaService {
  private apiUrl = 'http://localhost:8080/reportes-queja';

  constructor(private http: HttpClient) { }


  crearReporteQueja(reporteQueja: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear`, reporteQueja);
  }

  obtenerReporteQueja(quejaId: number): Observable<any[]> {
    const url = `${this.apiUrl}/listar/queja/${quejaId}`;
    return this.http.get<any[]>(url);
  }

}
