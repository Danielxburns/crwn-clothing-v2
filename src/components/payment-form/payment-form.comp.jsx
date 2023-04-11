import { useState } from 'react';
import { useSelector } from 'react-redux'
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartTotal } from '../../store/cart/cart.selector';

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from './payment-form.styles';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useSelector(selectCurrentUser);
  const amount = useSelector(selectCartTotal);
  const [ isProcessingPayment, setIsProcessingPayment ] = useState(false);


  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true)

    const res = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res => res.json()))

    const { paymentIntent: { client_secret } } = res;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        }
      }
    })

    setIsProcessingPayment(true);

    if(paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful')
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <CardElement />
        <PaymentButton disabled={isProcessingPayment}>Pay Now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
