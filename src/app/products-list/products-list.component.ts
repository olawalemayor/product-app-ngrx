import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import IProduct from '../product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products$!: Observable<IProduct[]>;

  deleteProduct(product: IProduct) {
    this.productService.deleteProduct(product);
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }
}
