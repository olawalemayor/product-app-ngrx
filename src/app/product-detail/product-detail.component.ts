import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  getProduct,
  updateProduct as productUpdate,
} from '../state/app.actions';
import { productSelector, errorSelector } from '../state/app.reducer';
import { AddProduct } from '../state/app.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  new!: boolean;
  subs = of().subscribe();

  productId!: string;

  error!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store
  ) {}

  productForm!: FormGroup;

  createProduct() {
    const { name, price } = this.productForm.value;
    const sub2 =
      name &&
      price &&
      this.store.dispatch(AddProduct({ name, price: Number(price) }));

    this.subs.add(sub2);

    if (this.error) alert(this.error);
  }

  updateProduct() {
    const { name, price } = this.productForm.value;

    const sub3 =
      this.productId &&
      name &&
      price &&
      this.store.dispatch(
        productUpdate({
          product: { id: this.productId, name, price: Number(price) },
        })
      );

    this.subs.add(sub3);

    if (this.error) alert(this.error);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
    });

    const sub1 = this.route.paramMap.subscribe((param) => {
      const id = param.get('id');

      if (id && id !== 'new') {
        this.store.dispatch(getProduct({ id }));

        this.productId = id;

        this.new = false;

        return this.store.select(productSelector).subscribe((product) => {
          this.productForm.setValue({
            name: product.name,
            price: product.price,
          });
        });
      }

      return (this.new = true);
    });

    const sub4 = this.store.select(errorSelector).subscribe((error) => {
      this.error = error;
    });

    this.subs.add(sub1);
    this.subs.add(sub4);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
