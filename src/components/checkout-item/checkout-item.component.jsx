import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) => {
    const {addItemToCart, removeItemFromCart, removeCartOutItem} = useContext(CartContext);
    const {id,name,price,quantity,imageUrl} = cartItem;
    const increaseHandler = () => addItemToCart(cartItem);
    const decreaseHandler = () => removeItemFromCart(cartItem);
    const removeHandler = () => removeCartOutItem(cartItem); 
    return (
        <div className='checkout-item-container' key={id}>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={decreaseHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={increaseHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={removeHandler}>&#10005;</div>
            {/* <span onClick={() => removeItemFromCart(cartItem)}>decrease</span>
                <span onClick={() => addItemToCart(cartItem)}>increase</span> */}
        </div>
    )
}

export default CheckoutItem;