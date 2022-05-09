import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setCartIsOpen = (isCartOpen) => 
createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen)

export const setCartItems = (cartItems) => 
createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems) 


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems,cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeCartOutItem = (cartItems, cartItemToRemove) => {
    const newCartItems = removeItemOut(cartItems,cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

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