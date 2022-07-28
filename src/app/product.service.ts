import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import IProduct from './product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:3000/products';

  constructor(private _http: HttpClient, private router: Router) {}

  //Get all products
  getProducts() {
    return this._http.get<IProduct[]>(this.apiUrl);
  }

  //Get single product
  getProduct(id: string) {
    return this._http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: IProduct) {
    return this._http.post<IProduct>(this.apiUrl, product);
  }

  updateProduct(product: IProduct) {
    return this._http.put<IProduct>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(product: IProduct) {
    return this._http.delete<IProduct>(`${this.apiUrl}/${product.id}`);
  }
}
