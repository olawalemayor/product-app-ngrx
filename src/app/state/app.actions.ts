import { createAction, props } from '@ngrx/store';
import IProduct from '../product';

export const deleteProduct = createAction(
  '[Products] Delete Product',
  props<{ product: IProduct }>()
);

export const deleteProductSuccess = createAction(
  '[Products] Delete Product Successful',
  props<{ product: IProduct }>()
);

export const deleteProductFail = createAction(
  '[Products] Delete Product Failure',
  props<{ error: string }>()
);

//Get a single Product
export const getProduct = createAction(
  '[Product] Get Single Product',
  props<{ id: string }>()
);

export const getProductSuccess = createAction(
  '[Product] Get Single Product Successful',
  props<{ product: IProduct }>()
);

export const getProductFail = createAction(
  '[Product] Get Single Product Failure',
  props<{ error: string }>()
);

//Get All Products
export const getProducts = createAction('[Products] Get All Product');

export const getProductsSuccess = createAction(
  '[Products] Get All Product Successful',
  props<{ products: IProduct[] }>()
);

export const getProductsFail = createAction(
  '[Products] Get All Product Failure',
  props<{ error: string }>()
);

//Update product
export const updateProduct = createAction(
  '[Products] Update Product',
  props<{ product: IProduct }>()
);

export const updateProductSuccess = createAction(
  '[Products] Update Product Successful',
  props<{ product: IProduct }>()
);

export const updateProductFail = createAction(
  '[Products] Update Product Failure',
  props<{ error: string }>()
);

//Add new product
export const AddProduct = createAction(
  '[Products] Add Product',
  props<{ name: string; price: number }>()
);

export const AddProductSuccess = createAction(
  '[Products] Add Product Successful',
  props<{ product: IProduct }>()
);

export const AddProductFail = createAction(
  '[Products] Add Product Failure',
  props<{ error: string }>()
);
