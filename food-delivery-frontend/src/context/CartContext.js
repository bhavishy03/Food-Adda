"use client"

import { createContext, useState, useContext } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    // Handle both _id and id fields
    const itemId = item._id || item.id
    const existingItem = cartItems.find((cartItem) => (cartItem._id || cartItem.id) === itemId)

    if (existingItem) {
      setCartItems((prev) =>
        prev.map((cartItem) =>
          (cartItem._id || cartItem.id) === itemId
            ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
            : cartItem,
        ),
      )
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: item.quantity || 1 }])
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => (item._id || item.id) !== itemId))
  }

  const increaseQuantity = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) => ((item._id || item.id) === itemId ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  const decreaseQuantity = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        (item._id || item.id) === itemId ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item,
      ),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getTotalAmount,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
