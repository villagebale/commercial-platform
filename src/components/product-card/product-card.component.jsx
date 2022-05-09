import './product-card.styles.scss'
import { useSelector } from 'react-redux'
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useDispatch } from 'react-redux'
import Button from '../button/button.component';
import {BUTTON_TYPE_CLASSES} from '../button/button.component';

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    
    const {id, name, price, imageUrl} = product;
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))
    return (
        <div className='product-card-container' key={id}>
            <img src={`${imageUrl}`} />
            <div className='footer' key={id}>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>ADD TO CART</Button>
        </div>
    )
}

export default ProductCard;