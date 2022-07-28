import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import State from './app.state';
import IProduct from '../product';
import * as AppActions from './app.actions';

interface AppState extends State {
  products: IProduct[];
  product: IProduct;
  error: string;
}

const appFeatureSelector = createFeatureSelector<AppState>('app');

export const productSelector = createSelector(
  appFeatureSelector,
  (state) => state.product
);

export const productsSelector = createSelector(
  appFeatureSelector,
  (state) => state.products
);

export const errorSelector = createSelector(
  appFeatureSelector,
  (state) => state.error
);

const initialState: AppState = {
  products: [],
  product: {
    name: '',
    price: 0,
  },
  error: '',
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.getProductsSuccess, (state, action): AppState => {
    return {
      ...state,
      products: action.products,
    };
  }),

  on(AppActions.getProductsFail, (state, action): AppState => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(AppActions.getProductSuccess, (state, action): AppState => {
    return {
      ...state,
      product: action.product,
    };
  }),

  on(AppActions.getProductFail, (state, action): AppState => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(AppActions.deleteProductSuccess, (state, action): AppState => {
    const newProducts = [...state.products];
    newProducts.splice(newProducts.indexOf(action.product), 1);

    return {
      ...state,
      products: newProducts,
    };
  }),

  on(AppActions.deleteProductFail, (state, action): AppState => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(AppActions.updateProductSuccess, (state, action): AppState => {
    return {
      ...state,
      product: action.product,
    };
  }),

  on(AppActions.updateProductFail, (state, action): AppState => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(AppActions.AddProductSuccess, (state, action): AppState => {
    const newProducts = [...state.products];
    newProducts.push(action.product);
    return {
      ...state,
      products: newProducts,
    };
  }),

  on(AppActions.AddProductFail, (state, action): AppState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
