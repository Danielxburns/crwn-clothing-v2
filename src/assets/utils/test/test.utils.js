import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { rootReducer } from '../../../store/root-reducer';

export function renderWithProviders(
  ui,
  {
    preLoadedState = {},
    store = createStore(rootReducer, preLoadedState),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
