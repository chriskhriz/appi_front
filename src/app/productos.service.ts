import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductosInterface } from './interfaces/productos-interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  //url = "https://piden.xyz/productos/";
  url = "http://172.20.10.2:3000/productos/";

  //url = "http://localhost:3000/productos/";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.get<ProductosInterface[]>(this.url, { headers, responseType: 'json' });
  }

  public getById(id: number) {
    console.log(id);
    console.log(this.url + id);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.get<ProductosInterface[]>(this.url + id, { headers, responseType: 'json' });
  }

  public saveProducto(producto: any): Observable<any> {
    console.log(producto)
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(this.url, producto, { headers, responseType: 'json' });
  }

  public update(id: number, apoderado: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<any>(this.url + id, apoderado, { headers, responseType: 'json' });
  }

}
