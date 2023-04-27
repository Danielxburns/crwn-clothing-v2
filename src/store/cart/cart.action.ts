import { createAction, ActionWIthPayload, withMatcher } from "../../assets/utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.type";
//import { selectCartItems } from "./cart.selector";



const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const decrimentCartItemQuantity = (cartItems: CartItem[], productToDecriment: CartItem): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToDecriment.id
  );
  if (existingCartItem && existingCartItem.quantity) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToDecriment.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem;
    });
  } else {
    return cartItems;
  }
};

const removeCartItem = (cartItems: CartItem[], cartItemRemove: CartItem): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemRemove.id);
};


// Action creators. exposed to components. Uses locally defined funcs that return an updated cart items array. all of these set the cart items but modify the data differently depending on HOW we want it modified

export type SetIsCartOpen = ActionWIthPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, Boolean>

export type SetCartItems = ActionWIthPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))

export const setIsCartOpen = withMatcher((bool: Boolean) : SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem):  SetCartItems => {
  const newCartItems = addCartItem(cartItems, productToAdd); // 
  return setCartItems(newCartItems)
};

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem): SetCartItems => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems)
};

export const decreaseItemQuantity = (cartItems: CartItem[], productToDecriment: CartItem): SetCartItems => {
  const newCartItems = decrimentCartItemQuantity(
    cartItems,
    productToDecriment
  );
  return setCartItems(newCartItems)
};
