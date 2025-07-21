"use client"

import { ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

const FloatingCartButton = () => {
  const navigate = useNavigate()
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => navigate("/cart")}
        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full w-16 h-16 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center relative"
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {itemCount}
          </span>
        )}
      </button>
    </div>
  )
}

export default FloatingCartButton
