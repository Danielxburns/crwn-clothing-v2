import { screen } from '@testing-library/react';
import Category from '../category.component';
import { renderWithProviders } from '../../../assets/utils/test/test.utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    category: 'mens',
  }),
}));

describe('Category tests', () => {
  test('It should render spinner if isLoading is true', () => {
    renderWithProviders(<Category />, {
      preLoadedState: {
        categories: {
          isLoading: true,
          categories: [],
        },
      },
    });
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('It should render products when isLoading is false and products are present', () => {
    renderWithProviders(<Category />, {
      preLoadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              title: 'mens',
              items: [
                { id: 1, name: 'product 1' },
                { id: 2, name: 'product 2' },
              ],
            },
          ],
        },
      },
    });
    const spinnerElement = screen.queryByTestId('spinner');
    expect(spinnerElement).toBeNull();

    const productElement = screen.getByText(/product 1/i);
    expect(productElement).toBeInTheDocument();
  });
});
