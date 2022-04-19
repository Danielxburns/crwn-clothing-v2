import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from './checkout-item.styles.jsx';

const CheckoutItem = ({ item }) => {
  const { imageUrl, name, price, quantity } = item;
  
  const { addItemToCart, decreaseItemQuantity, removeItemFromCart } = useContext(CartContext);

  const incrementQuantity = () => addItemToCart(item);
  const decrimentQuantity = () => decreaseItemQuantity(item);
  const removeItem = () => removeItemFromCart(item);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={decrimentQuantity}>❮</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={incrementQuantity}>❯</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={removeItem}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
