import { selectCartItems, selectIsCartOpen, selectCartCount, selectCartTotal } from "../cart.selector";

const mockState = {
  cart:{
    isCartOpen: false,
    cartItems: [
      {
        id: 1,
        imageUrl: 'test1',
        name: 'Item 1',
        price: 10,
        quantity: 2,
      },
      {
        id: 2,
        imageUrl: 'test2',
        name: 'Item 2',
        price: 10,
        quantity: 1,
      },
    ]
  }
};

describe("Cart selector tests", () => {
  test("selectCartItems should return cart items", () => {
    expect(selectCartItems(mockState)).toEqual(mockState.cart.cartItems)
  });

  test("selectIsCartOpen should return isCartOpen state", () => {
    expect(selectIsCartOpen(mockState)).toEqual(false)
  });

  test("selectCartCount should return total quantity of items in cart", () => {
    expect(selectCartCount(mockState)).toEqual(3)
  });

  test("selectCartTotal should return cart total", () => {
    expect(selectCartTotal(mockState)).toEqual(30)
  })
})