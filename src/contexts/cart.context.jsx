import { createContext, useState, useEffect } from 'react';

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
  cartTotal:0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);


  useEffect(() => {
    const count = cartItems.reduce((acc, currItem) => acc + currItem.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  useEffect(() => {
    const total = cartItems.reduce((acc, currItem)=> currItem.price * currItem.quantity + acc, 0);
    setCartTotal(total);
  }, [cartItems]);

  
  const addItemToCart = (productToAdd) => {
    // **non-state function variable passed to context thru 'value' property.
    // Accepts an item passed from a component that has access to this context**
    setCartItems(addCartItem(cartItems, productToAdd)); // **uses locally defined function to modify state before setting**
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const decreaseItemQuantity = (productToDecriment) => {
    setCartItems(decrimentCartItemQuantity(cartItems, productToDecriment))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    decreaseItemQuantity,
    removeItemFromCart,
    cartItems,
    cartCount,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
