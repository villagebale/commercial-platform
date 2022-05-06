import { Outlet, Link} from "react-router-dom";
import { Fragment,useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {ReactComponent as InfiLogo} from '../../assets/infinity.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import {NavigationContainer, LogoContainer,NavLinks,NavLink}
from './navigation.styles.jsx'

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen, setIsCartOpen} = useContext(CartContext);
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <InfiLogo />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        Shop
                    </NavLink>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser} >Sign Out</span>) :
                            (<NavLink to='/auth'>
                                Sign In
                            </NavLink>)
                    }
                    <CartIcon />
                </NavLinks>
                {
                    isCartOpen && (<CartDropdown />) }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;