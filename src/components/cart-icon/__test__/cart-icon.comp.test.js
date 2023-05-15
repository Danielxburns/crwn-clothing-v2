import { screen } from '@testing-library/react'
import { renderWithProviders } from "../../../assets/utils/test/test.utils";
import CartIcon from "../cart-icon.component";

describe('Cart Icon test', () => {
  test('Uses preloaded state to render', () => {
    const initialCartItems = [{
      id:1, name: "item1", imageUrl: 'test', price: 10, quantity: 1
    }, {
      id:2, name: "item2", imageUrl: 'test', price: 10, quantity: 2
    }];
    renderWithProviders(<CartIcon/>, {
      preLoadedState: {
        cart: {
          cartItems: initialCartItems
        }
      }
    });
    const cartIconElement = screen.getByText('3');
    expect(cartIconElement).toBeInTheDocument();
  })
})