import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'typed-redux-saga/macro';
import { USER_ACTION_TYPES } from '../user.types';
import {
  userSagas,
  onCheckUserSession,
  onEmailSignInStart,
  onGoogleSignInStart,
  onSignUpStart,
  onSignUpSuccess,
  onSignOutStart,
  signOut,
  signInAfterSignUp,
  signUp,
  signInWithGoogle,
  signInWithEmail,
  isUserAuthenticated,
  getSnapshotFromUserAuth,
} from '../user.saga';
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
} from '../../user/user.action';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInfo,
} from '../../../assets/utils/firebase/firebase.utils';

describe('User Sagas', () => {
  test('userSagas', () => {
    testSaga(userSagas)
      .next()
      .all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
      ])
      .next()
      .isDone();
  });
  test('onCheckUserSession saga should takeLatest CHECK_USER_SEEEION and call isUserAuthenticated', () => {
    testSaga(onCheckUserSession)
      .next()
      .takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
      .next()
      .isDone();
  });
  test('onEmailSignInStart saga should takeLatest EMAIL_SIGN_IN_START and call signInWithEmail', () => {
    testSaga(onEmailSignInStart)
      .next()
      .takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
      .next()
      .isDone();
  });
  test('onGoogleSignInStart saga should takeLatest GOOGLE_SIGN_IN_START and call signInWithGoogle', () => {
    testSaga(onGoogleSignInStart)
      .next()
      .takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
      .next()
      .isDone();
  });
  test('onSignUpStart saga should takeLatest SIN+GN_UP_START and call signUp', () => {
    testSaga(onSignUpStart)
      .next()
      .takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
      .next()
      .isDone();
  });
  test('onSignUpSuccess saga should takeLatest SIGN_UP_SUCCESS and call signInAfterSignUp', () => {
    testSaga(onSignUpSuccess)
      .next()
      .takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
      .next()
      .isDone();
  });
  test('onSignOutStart saga should takeLatest SIGN_OUT_START and call signOut', () => {
    testSaga(onSignOutStart)
      .next()
      .takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
      .next()
      .isDone();
  });
  test('signInAfterSignUp saga should call getSnapshotFromUserAuth and sign in user', () => {
    const mockUser = { id: 1, name: 'test' };
    const mockDetails = { displayName: 'test' };
    const mockPayload = { user: mockUser, additionalDetails: mockDetails };
    testSaga(signInAfterSignUp, { payload: mockPayload })
      .next()
      .call(getSnapshotFromUserAuth, mockUser, mockDetails)
      .next()
      .isDone();
  });
  test('signOut saga success path should call signOutUser and put signOutSuccess', () => {
    expectSaga(signOut)
      .provide([[call(signOutUser)]])
      .put(signOutSuccess())
      .run()
  })
  
});
