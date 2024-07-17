import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemApi {
  idItems: number;
  objectId: number;
  name: string;
  description: string;
  customer: string;
  price: number;
  stock: number;
  img: string;
}

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private baseUrl = 'http://localhost:5146/api';

  constructor(private http: HttpClient) {}

  getObjects(data?: any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/Items`);
  }

  getObjectswithstock(data?: any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/Items/instock`);
  }

  getObjectById(idItems: number): Observable<ItemApi> {
    return this.http.get<ItemApi>(`${this.baseUrl}/Items/${idItems}`);
  }

  createObject(data?: any): Observable<any> {
    return this.http.post<any[]>(`${this.baseUrl}/Items`, data);
  }

  deleteObject(idItems: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Items/${idItems}`);
  }

  updateObject(Object: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/Items/${Object.idItems}`,
      Object
    );
    
  }
}
