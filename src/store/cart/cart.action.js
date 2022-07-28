import { createAction } from "../../assets/utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.type";
//import { selectCartItems } from "./cart.selector";


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


export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

// Action creators. exposed to components. Uses locally defined funcs that return an updated cart items array. all of these set the cart items but modify the data differently depending on HOW we want it modified
export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd); // 
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const decreaseItemQuantity = (cartItems, productToDecriment) => {
  const newCartItems = decrimentCartItemQuantity(
    cartItems,
    productToDecriment
  );
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
