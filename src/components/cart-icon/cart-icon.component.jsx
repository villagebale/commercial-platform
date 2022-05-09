import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { useSelector } from 'react-redux'
import { selectCartOpen,selectCartCount } from '../../store/cart/cart.selector'
import { useDispatch } from 'react-redux'
import { setCartIsOpen } from '../../store/cart/cart.action'
import './cart-icon.styles.scss'

const CartIcon = () => {
    //const {isCartOpen, setIsCartOpen,cartCount} = useContext(CartContext);
    const isCartOpen = useSelector(selectCartOpen);
    const cartCount = useSelector(selectCartCount);
    const dispatch = useDispatch();

    const onCartDropdownHandler = () => {
        dispatch(setCartIsOpen(!isCartOpen));
    }

    return (
        <div className='cart-icon-container' onClick={onCartDropdownHandler}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount }</span>
        </div>
    )
}
export default CartIcon;