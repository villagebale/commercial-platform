import { createContext,  useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";


export const addCartItem = (cartItems, productToAdd) => {

    const existCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    if (existCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id 
            ?{ ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        )
    };

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

export const removeCartItem = (cartItems, itemToRemove) => {
    const existCartItem = cartItems.find(
        (cartItem) => cartItem.id === itemToRemove.id
    );
    if (existCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => {
            if (cartItem.id === itemToRemove.id) {
                return false;
            }
            else return true;
        }
        )
    }
    else {
        return cartItems.map((cartItem) =>
            cartItem.id === itemToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        )
    }
}

export const removeItemOut = (cartItems, itemToRemove) => {

    return cartItems.filter((cartItem) => {
        return cartItem.id !== itemToRemove.id
    })
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addCartItemToCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN : 'SET_IS_CART_OPEN',
    SET_CART_ITEMS : 'SET_CART_ITEMS',
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    // payload = {cartItems, cartCount, cartTotal};

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

export const CartProvider = ({ children }) => {
    const [{isCartOpen,cartItems,cartCount,cartTotal} , dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const setIsCartOpen = (isOpen) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, {isCartOpen : isOpen}))
    }
  
    const updateCartItemReducer = (newCartItems) => {
        const reduceCartCount =  newCartItems.reduce((accumulator,currentItem) =>{
            return accumulator + currentItem.quantity;
        }, 0)
    
        const reduceCartTotal =  newCartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.quantity * currentItem.price;
        }, 0)

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
            cartItems : newCartItems,
            cartCount : reduceCartCount,
            cartTotal : reduceCartTotal
        }));

    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    }
    
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems,cartItemToRemove);
        updateCartItemReducer(newCartItems);
    }

    const removeCartOutItem = (cartItemToRemove) => {
        const newCartItems = removeItemOut(cartItems,cartItemToRemove);
        updateCartItemReducer(newCartItems);
    }

    const value = { isCartOpen, cartItems, cartCount, cartTotal,
        setIsCartOpen, addItemToCart, removeItemFromCart, removeCartOutItem};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
