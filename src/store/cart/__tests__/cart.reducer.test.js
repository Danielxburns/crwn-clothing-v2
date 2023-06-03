import { cartReducer, CART_INITIAL_STATE } from '../cart.reducer';
import { setCartItems } from '../cart.action';

describe('Cart reducer tests', () => {
  test('setCartItems', () => {
    const mockItems = [
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
    ];
    const expectedState = { ...CART_INITIAL_STATE, cartItems: mockItems };
    expect(cartReducer(CART_INITIAL_STATE, setCartItems(mockItems))).toEqual(
      expectedState
    );
  });
});
