import { Outlet, Link} from "react-router-dom";
import { Fragment,useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {ReactComponent as InfiLogo} from '../../assets/infinity.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import './navigation.styles.scss'

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen, setIsCartOpen} = useContext(CartContext);
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <InfiLogo />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser} >Sign Out</span>) :
                            (<Link className="nav-link" to='/auth'>
                                Sign In
                            </Link>)
                    }
                    <CartIcon />
                </div>
                {
                    isCartOpen && (<CartDropdown />) }
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;