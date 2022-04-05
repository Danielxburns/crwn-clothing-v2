import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
  const { imageUrl, name, price, quantity } = item;
  
  const { addItemToCart, decreaseItemQuantity, removeItemFromCart } = useContext(CartContext);

  const incrementQuantity = () => addItemToCart(item);
  const decrimentQuantity = () => decreaseItemQuantity(item);
  const removeItem = () => removeItemFromCart(item);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <span className="arrow" onClick={decrimentQuantity}>❮</span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={incrementQuantity}>❯</span>
      </div>
      <div className="price">{price}</div>
      <div className="remove-button" onClick={removeItem}>&#10005;</div>
    </div>
  );
};

export default CheckoutItem;
