import { userReducer, INITIAL_STATE } from '../user.reducer';
import {
  signInSuccess,
  signOutSuccess,
  signInFailed,
  signUpFailed,
  signOutFailed,
} from '../user.action';

describe('User reducer tests', () => {
  test('signInSuccess should update current user', () => {
    const mockUser = { id: 1, email: 'test' }
    const expectedState = {
      ...INITIAL_STATE,
      currentUser: mockUser,
    };
    expect(userReducer(INITIAL_STATE, signInSuccess(mockUser))).toEqual(
      expectedState
    );
  });

  test('signOutSuccess should set current user to null', () => {
    const mockState = {
      ...INITIAL_STATE,
      currentUser: {},
    };
    expect(userReducer(mockState, signOutSuccess())).toEqual(INITIAL_STATE);
  });

  test('signInFailed should set an error', () => {
    const mockError = new Error('error signing in');
    const expectedState = {
      ...INITIAL_STATE, error: mockError,
    };
    expect(userReducer(INITIAL_STATE, signInFailed(mockError))).toEqual(
      expectedState
    );
  });

  test('signUpFailed should set an error', () => {
    const mockError = new Error('error signing up');
    const expectedState = {
      ...INITIAL_STATE, error: mockError,
    };
    expect(userReducer(INITIAL_STATE, signUpFailed(mockError))).toEqual(
      expectedState
    );
  });

  test('signOutFailed', () => {
    const mockState = {
      ...INITIAL_STATE,
      currentUser: {},
    };
    const mockError = new Error('error signing up');
    const expectedState = {
      currentUser: {},
      isLoading: false,
      error: mockError,
    };
    expect(userReducer(mockState, signOutFailed(mockError))).toEqual(
      expectedState
    );
  });
});
