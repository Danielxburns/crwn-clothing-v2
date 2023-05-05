import { takeLatest, put, call, all } from 'typed-redux-saga/macro';
import { USER_ACTION_TYPES } from './user.types';
import { User } from 'firebase/auth'
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
} from './user.action';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInfo
} from '../../assets/utils/firebase/firebase.utils';

/* ------------- WORKER SAGAS ------------ */

// gets user data from Firebase - Called w/in all sign-in sagas
export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInfo) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    if (userSnapshot){
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
// triggered by useEffect when app loads. Checks if a user is still signed in to Firebase 
export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if(userCredential){
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({ payload: { email, password, displayName } }: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    ); //returns an Auth obj with a user property that has the data we want
    if(userCredential){
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess())
  } catch (error) {
    yield* put(signOutFailed(error as Error))
  }
}

/* ---------- WATCHER SAGAS ---------- */

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}


/* --------- AGGREGATE USER SAGA --------- */

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
