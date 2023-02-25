import { useState } from 'react';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../assets/utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button, {
  BUTTON_TYPE_CLASSES,
} from '../button-component/button.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx';

const defaultSignInFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [signInFormFields, setSignInFormFields] = useState(
    defaultSignInFormFields
  );
  const { email, password } = signInFormFields;

  const resetFormFields = () => {
    setSignInFormFields(defaultSignInFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInFormFields({ ...signInFormFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user not found':
          alert('no user associated with this email.');
          break;
        default:
          console.log(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
