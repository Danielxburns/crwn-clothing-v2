import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart, decreaseItemQuantity } from '../../store/cart/cart.action';

import { selectCartItems } from '../../store/cart/cart.selector';

import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from './checkout-item.styles.jsx';

const CheckoutItem = ({ item }) => {
  const { imageUrl, name, price, quantity } = item;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const incrementQuantity = () => dispatch(addItemToCart(cartItems, item));
  const decrimentQuantity = () => dispatch(decreaseItemQuantity(cartItems, item));
  const removeItem = () => dispatch(removeItemFromCart(cartItems, item));

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
