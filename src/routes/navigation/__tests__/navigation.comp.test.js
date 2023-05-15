import { screen } from '@testing-library/react'
import Navigation from '../navigation.component'
import { renderWithProviders } from '../../../assets/utils/test/test.utils'
import exp from 'constants'
import { sign } from 'crypto'

describe('Navigation tests', () => {
  test('It should render a Sign In link and not a Sign Out link if there is no current user', () => {
    renderWithProviders(<Navigation/>, {
      preLoadedState: {
        user: {
          currentUser: null
        }
      }
    });
    const signOutLinkElement = screen.queryByText(/sign out/i);
    expect(signOutLinkElement).toBeNull();

    const signInLinkElement = screen.getByText(/sign in/i);
    expect(signInLinkElement).toBeInTheDocument();
  })
  test("it should render Sign Out and not Sign In if there is a current user", () => {
    renderWithProviders(<Navigation/>, {
      preLoadedState: {
        user: {
          currentUser: 'user'
        }
      }
    });
    const signInLinkElement = screen.queryByText(/sign in/i);
    expect(signInLinkElement).toBeNull();

    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();
  })
})