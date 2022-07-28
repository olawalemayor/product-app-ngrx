import { Component, OnInit, OnDestroy } from '@angular/core';
import IProduct from '../product';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { deleteProduct, getProducts } from '../state/app.actions';
import { productsSelector } from '../state/app.reducer';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  subs = of().subscribe();

  products$!: Observable<IProduct[]>;

  deleteProduct(product: IProduct) {
    this.store.dispatch(deleteProduct({ product }));
  }

  ngOnInit(): void {
    const sub1 = this.store.dispatch(getProducts());
    this.subs.add(sub1);

    this.products$ = this.store.select(productsSelector);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
