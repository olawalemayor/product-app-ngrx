import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ProductService } from '../product.service';
import * as AppActions from './app.actions';
import { Router } from '@angular/router';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private router: Router
  ) {}

  //get single product
  getProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.getProduct),
      mergeMap(({ id }) =>
        this.productService.getProduct(id).pipe(
          map(
            (product) => AppActions.getProductSuccess({ product }),
            catchError((error) => of(AppActions.getProductFail({ error })))
          )
        )
      )
    );
  });

  //get all products
  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.getProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map(
            (products) => AppActions.getProductsSuccess({ products }),
            catchError((error) => of(AppActions.getProductsFail({ error })))
          )
        )
      )
    );
  });

  //add product
  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.AddProduct),
      mergeMap(({ name, price }) =>
        this.productService.addProduct({ name, price }).pipe(
          map(
            (product) => AppActions.AddProductSuccess({ product }),
            catchError((error) => of(AppActions.AddProductFail({ error })))
          )
        )
      )
    );
  });

  //If adding was successfull go back home
  addSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AppActions.AddProductSuccess),
        tap(() => this.router.navigateByUrl(''))
      );
    },
    { dispatch: false }
  );

  //Update product
  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.updateProduct),
      mergeMap(({ product }) =>
        this.productService.updateProduct(product).pipe(
          map(
            (product) => AppActions.updateProductSuccess({ product }),
            catchError((error) => of(AppActions.updateProductFail({ error })))
          )
        )
      )
    );
  });

  //If update was sucessfult go back home
  updateSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AppActions.updateProductSuccess),
        tap(() => this.router.navigateByUrl(''))
      );
    },
    { dispatch: false }
  );

  //delete product
  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.deleteProduct),
      mergeMap(({ product }) =>
        this.productService.deleteProduct(product).pipe(
          map(
            () => AppActions.deleteProductSuccess({ product }),
            catchError((error) => of(AppActions.deleteProductFail({ error })))
          )
        )
      )
    );
  });
}
