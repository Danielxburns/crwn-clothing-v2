import { screen, fireEvent } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import Navigation from '../navigation.component';
import { renderWithProviders } from '../../../assets/utils/test/test.utils';
import { signOutStart } from '../../../store/user/user.action';

describe('Navigation tests', () => {
  test('It should dispatch signOutStart action when clicking on the Sign Out link', async () => {
    const mockDispatch = jest.fn();
    jest.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);
    renderWithProviders(<Navigation />, {
      preLoadedState: {
        user: {
          currentUser: {}
        }
      }
    })
    const signOutLinkelement = screen.getByText(/sign out/i);
    expect(signOutLinkelement).toBeInTheDocument();
    await fireEvent.click(signOutLinkelement);
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(signOutStart());
    mockDispatch.mockClear();
  })

  test('It should render a Sign In link and not a Sign Out link if there is no current user', () => {
    renderWithProviders(<Navigation />, {
      preLoadedState: {
        user: {
          currentUser: null,
        },
      },
    });
    const signOutLinkElement = screen.queryByText(/sign out/i);
    expect(signOutLinkElement).toBeNull();

    const signInLinkElement = screen.getByText(/sign in/i);
    expect(signInLinkElement).toBeInTheDocument();
  });
  test('it should render Sign Out and not Sign In if there is a current user', () => {
    renderWithProviders(<Navigation></Navigation>, {
      preLoadedState: {
        user: {
          currentUser: {},
        },
      },
    });
    const signInLinkElement = screen.queryByText(/sign in/i);
    expect(signInLinkElement).toBeNull();

    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();
  });

  test('it should not render a cart dropdown if cartIsOpen is false', () => {
    renderWithProviders(<Navigation />, {
      preLoadedState: {
        cart: {
          isCartOpen: false,
          cartItems: [],
        },
      },
    });
    const cartDropdownTextElement = screen.queryByText(/your cart is empty/i);
    expect(cartDropdownTextElement).toBeNull();
  });

  test('it should render a cart dropdown if cartIsOpen is true', () => {
    renderWithProviders(<Navigation />, {
      preLoadedState: {
        cart: {
          isCartOpen: true,
          cartItems: [],
        },
      },
    });
    const cartDropdownTextElement = screen.getByText(/your cart is empty/i);
    expect(cartDropdownTextElement).toBeInTheDocument();
  });
});
