import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button, {
  BUTTON_TYPE_CLASSES,
} from '../button-component/button.component';
import { PaymentFormContainer, FormContainer } from './payment-form.styles';

const PaymentForm = () => {

  const stripe= useStripe();
  const elements = useElements();
  const currentUser = useSelector(selectCurrentUser);
  const amount = useSelector(selectCartTotal);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if(!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount * 100 })
    }).then(res=>res.json());
    //console.log('paymentHandler response :>> ', response);

    const { paymentIntent: { client_secret } } = response; // destructure off nested 'client_secret'

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest'
        }
      }
    })

    setIsProcessingPayment(false);

    if(paymentResult.error) {
      alert(paymentResult.error.message)
    } else {
      if(paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful!')
      }
    }
  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay now </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
