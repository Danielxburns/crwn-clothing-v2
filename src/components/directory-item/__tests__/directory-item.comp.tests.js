import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../assets/utils/test/test.utils';
import DirectoryItem from '../directory-item.component';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Directory Item tests', () => {
  test('It should navigate to the correct route on component click', () => {
    const directoryCategory = {
      id: 1,
      title: 'hats',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
      route: 'shop/hats',
    };
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    renderWithProviders(<DirectoryItem category={directoryCategory} />);
    fireEvent.click(screen.getByText(/shop now/i));
    expect(navigate).toBeCalledWith('shop/hats');
  });
});
