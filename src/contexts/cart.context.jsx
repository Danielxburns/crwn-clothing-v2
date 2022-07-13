import { createContext, useReducer } from 'react';
import { createAction } from '../assets/utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  // accepts context array and item to find
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id // find item by id (will return undefined if not found)
  );
  if (existingCartItem) {
    // if found (happens if item is already in cart)
    return cartItems.map(
      (
        cartItem // return the result of mapping over all the items in context array
      ) =>
        cartItem.id === productToAdd.id // while mapping, identify matching item
          ? { ...cartItem, quantity: cartItem.quantity + 1 } //  and return destr item with updated quantity
          : cartItem //  or just return non matching items
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }]; // if item is not in cart, return new array with new item and quantity property
};

const decrimentCartItemQuantity = (cartItems, productToDecriment) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToDecriment.id
  );
  if (existingCartItem.quantity) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToDecriment.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem;
    });
  } else {
    return cartItems;
  }
};

const removeCartItem = (cartItems, cartItemRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (acc, currItem) => acc + currItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (acc, currItem) => currItem.price * currItem.quantity + acc,
      0
    );
    const updatedStateProperties = {
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedStateProperties)
    );
  };

  const addItemToCart = (productToAdd) => {
    // **non-state function variable passed to context thru 'value' property.
    // Accepts an item passed from a component that has access to this context**
    const newCartItems = addCartItem(cartItems, productToAdd); // **uses locally defined function to modify state before setting**
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const decreaseItemQuantity = (productToDecriment) => {
    const newCartItems = decrimentCartItemQuantity(
      cartItems,
      productToDecriment
    );
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    decreaseItemQuantity,
    removeItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
