import { AnyAction } from 'redux';
import { UserData } from '../../assets/utils/firebase/firebase.utils'; 
import { signInSuccess, signInFailed, signUpFailed, signOutSuccess, signOutFailed } from './user.action';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
}

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {
  if(signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload }
  }
  if(signOutSuccess.match(action)) {
    return { ...state, currentUser: null }
  }
  if(signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)) {
    return { ...state, error: action.payload }
  }
  return state
};

/*   const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      return {
        ...state,
        error: payload,
      };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state, currentUser: null
      }
    default:
      return state;
  } */