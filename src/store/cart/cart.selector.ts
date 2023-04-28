import { createSelector } from 'reselect';
import { RootState } from '../store';
import { CartState } from './cart.reducer';

const selectCartFromState = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartFromState],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartFromState],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, currItem) => acc + currItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (acc, currItem) => currItem.price * currItem.quantity + acc,
    0
  )
);

/* const newCartCount = newCartItems.reduce(
  (acc, currItem) => acc + currItem.quantity,
  0
); */
/* const newCartTotal = newCartItems.reduce(
  (acc, currItem) => currItem.price * currItem.quantity + acc,
  0
); */
