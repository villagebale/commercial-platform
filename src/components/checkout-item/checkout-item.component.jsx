import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector';
import { useDispatch } from 'react-redux'
import { addItemToCart, removeItemFromCart, removeCartOutItem } from '../../store/cart/cart.action';
import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) => {
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const {id,name,price,quantity,imageUrl} = cartItem;
    const increaseHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const decreaseHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const removeHandler = () => dispatch(removeCartOutItem(cartItems, cartItem)); 
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
        </div>
    )
}

export default CheckoutItem;