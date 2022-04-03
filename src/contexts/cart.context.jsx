import { createContext, useState } from 'react';

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    // **non-state function variable passed to context thru 'value' property.
    // Accepts an item passed from a component that has access to this context**
    setCartItems(addCartItem(cartItems, productToAdd)); // **uses locally defined function to modify state before setting**
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
