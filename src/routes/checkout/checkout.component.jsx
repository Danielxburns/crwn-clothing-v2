import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';


const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <span>Product</span>
        <span>Description</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Remove</span>
      </div>
      {cartItems.length ?
      cartItems.map(cartItem => <CheckoutItem key={cartItem.id} item={cartItem} />) :
      <div>Cart is empty</div>
      }
      <div className='total'>Total: ${cartTotal}</div>
    </div>
  );
};

export default Checkout;
