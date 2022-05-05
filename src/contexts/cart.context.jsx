import { createContext, useState, useEffect } from "react";


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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        setCartCount(reduceCartCount());
    }, [cartItems]);

    useEffect(() => {
        setCartTotal(reduceCartTotal());
    }, [cartItems]);

    const addItemToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));
    
    const reduceCartCount = () => cartItems.reduce((accumulator,currentItem) =>{
        return accumulator + currentItem.quantity;
    }, 0)

    const reduceCartTotal = () => cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity * currentItem.price;
    }, 0)

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems,cartItemToRemove));
    }

    const removeCartOutItem = (cartItemToRemove) => {
        setCartItems(removeItemOut(cartItems,cartItemToRemove));
    }

    const value = { isCartOpen, setIsCartOpen, 
        cartItems, addItemToCart, 
        cartCount,cartTotal,
        removeItemFromCart,removeCartOutItem};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
