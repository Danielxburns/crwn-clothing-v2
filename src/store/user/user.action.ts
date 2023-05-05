import { User } from 'firebase/auth'
import { USER_ACTION_TYPES } from './user.types';
import { UserData, AdditionalInfo } from '../../assets/utils/firebase/firebase.utils'; 
import {
  createAction,
  Action,
  ActionWIthPayload,
  withMatcher,
} from '../../assets/utils/reducer/reducer.utils';

export type SetCurrentUser = ActionWIthPayload<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  UserData
>;

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWIthPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;

export type SignInSuccess = ActionWIthPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  UserData
>;

export type SignInFailed = ActionWIthPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILED,
  Error
>;

export type SignUpStart = ActionWIthPayload<
  USER_ACTION_TYPES.SIGN_UP_START,
  { email: string; password: string; displayName: string }
>;

export type SignUpSuccess = ActionWIthPayload<
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  { user: User; additionalDetails?: AdditionalInfo }
>;

export type SignUpFailed = ActionWIthPayload<
  USER_ACTION_TYPES.SIGN_UP_FAILED,
  Error
>;

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWIthPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILED,
  Error
>;

export const setCurrentUser = withMatcher(
  (user: UserData): SetCurrentUser =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);

export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

/* ----------- SIGN-IN ACTIONS ----------- */
export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher((
  email: string,
  password: string
): EmailSignInStart =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password }));

export const signInSuccess = withMatcher((user: UserData & { id: string }): SignInSuccess =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user));

export const signInFailed = withMatcher((error: Error): SignInFailed =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error));

/* ----------- SIGN-UP ACTIONS ----------- */
export const signUpStart = withMatcher((
  email: string,
  password: string,
  displayName: string
): SignUpStart =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  }));

export const signUpSuccess = withMatcher((
  user: User,
  additionalDetails?: AdditionalInfo
): SignUpSuccess =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails }));

export const signUpFailed = withMatcher((error: Error): SignUpFailed =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error));

/* ----------- SIGN-OUT ACTIONS ---------- */
export const signOutStart = withMatcher((): SignOutStart =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START));
export const signOutSuccess = withMatcher((): SignOutSuccess =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS));
export const signOutFailed = withMatcher((error: Error): SignOutFailed =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error));
