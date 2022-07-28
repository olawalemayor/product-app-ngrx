import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  new!: boolean;
  subs = of().subscribe();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  productForm!: FormGroup;

  createProduct() {
    const { name, price } = this.productForm.value;
    const sub2 =
      name &&
      price &&
      this.productService.addProduct({ name, price: Number(price) });
    this.subs.add(sub2);
  }

  updateProduct() {
    const { id, name, price } = this.productForm.value;

    const sub3 =
      id &&
      name &&
      price &&
      this.productService.updateProduct({ id, name, price: Number(price) });

    this.subs.add(sub3);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      price: [0, Validators.required],
    });

    const sub1 = this.route.paramMap.subscribe((param) => {
      const id = param.get('id');

      if (id && id !== 'new') {
        this.productService.getProduct(id);

        this.new = false;

        return this.productService.product$.subscribe((product) => {
          this.productForm.setValue({
            id: product.id,
            name: product.name,
            price: product.price,
          });
        });
      }

      return (this.new = true);
    });

    this.subs.add(sub1);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
