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

  products$ = new Subject<IProduct[]>();
  product$ = new Subject<IProduct>();

  //Get all products
  getProducts() {
    this._http
      .get<IProduct[]>(this.apiUrl)
      .subscribe((products) => this.products$.next(products));
  }

  //Get single product
  getProduct(id: string) {
    this._http
      .get<IProduct>(`${this.apiUrl}/${id}`)
      .subscribe((product) => this.product$.next(product));
  }

  addProduct(product: IProduct) {
    this._http.post(this.apiUrl, product).subscribe(() => {
      this.getProducts();
      this.router.navigateByUrl('');
    });
  }

  updateProduct(product: IProduct) {
    this._http.put(`${this.apiUrl}/${product.id}`, product).subscribe(() => {
      this.getProducts();
      this.router.navigateByUrl('');
    });
  }

  deleteProduct(product: IProduct) {
    this._http
      .delete(`${this.apiUrl}/${product.id}`)
      .subscribe(() => this.getProducts());
  }
}
