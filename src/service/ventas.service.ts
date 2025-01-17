import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  private baseUrl = 'http://localhost:5146/api';

  constructor(private http: HttpClient) {}

  createPreV(preV: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/PreV`, preV);
  }
  createVenta(venta: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Ventas`, venta);
  }

  getVentas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Ventas`);
  }
}
