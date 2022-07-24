import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IProduct from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:3000/products';

  constructor(private _http: HttpClient) {}

  //Get all products
  getProducts() {
    return this._http.get<IProduct[]>(this.apiUrl);
  }

  //Get single product
  getProduct(product: IProduct) {
    const productId = product.id;

    return this._http.get(`${this.apiUrl}/${productId}`);
  }

  addProduct(product: IProduct) {
    const productLength = this.getProducts().pipe.length;
    product.id = (productLength + 1).toString();

    return this._http.post(this.apiUrl, product);
  }

  updateProduct(product: IProduct) {
    return this._http.put(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(product: IProduct) {
    this._http.delete(`${this.apiUrl}/${product.id}`);
  }
}
