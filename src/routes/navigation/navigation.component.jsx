import { Outlet, } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from 'react-redux' 
import { selectCurrentUser  } from "../../store/user/user.selector";
import { selectCartOpen } from "../../store/cart/cart.selector";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {ReactComponent as InfiLogo} from '../../assets/infinity.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import {NavigationContainer, LogoContainer,NavLinks,NavLink}
from './navigation.styles.jsx'

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen  = useSelector(selectCartOpen);
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