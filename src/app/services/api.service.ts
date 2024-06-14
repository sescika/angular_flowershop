import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.httpClient.get('assets/jsons/categories.json');
  }

  getAllProducts(): Observable<any> {
    return this.httpClient.get('assets/jsons/products.json');
  }

}
