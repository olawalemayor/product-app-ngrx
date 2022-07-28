import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import IProduct from '../product';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) {}

  subs = of().subscribe();

  products$!: Observable<IProduct[]>;

  deleteProduct(product: IProduct) {
    const sub2 = this.productService.deleteProduct(product);
    this.subs.add(sub2);
  }

  ngOnInit(): void {
    const sub1 = this.productService.getProducts();
    this.subs.add(sub1);

    this.products$ = this.productService.products$;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
