"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaSearch,
  FaFire,
  FaBell,
  FaStar,
  FaHeart,
  FaFilter,
  FaClock,
  FaTag,
  FaChartLine, // Replace FaTrendingUp with FaChartLine
  FaMapPin,
} from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"
import Lottie from "lottie-react"
import { useCart } from "../context/CartContext"
import loaderAnimation from "../assets/animations/loading-food.json"
import foodData from "../data/foodData"
import FloatingCartButton from "../components/FloatingCartButton"
import "react-toastify/dist/ReactToastify.css"

const categories = [
  { name: "All", icon: "🍽️", color: "from-purple-500 to-pink-500" },
  { name: "Pizza", icon: "🍕", color: "from-red-500 to-orange-500" },
  { name: "Burger", icon: "🍔", color: "from-yellow-500 to-orange-500" },
  { name: "Indian", icon: "🍛", color: "from-orange-500 to-red-500" },
  { name: "Desserts", icon: "🍰", color: "from-pink-500 to-purple-500" },
  { name: "Beverages", icon: "🥤", color: "from-blue-500 to-cyan-500" },
  { name: "Pasta", icon: "🍝", color: "from-green-500 to-teal-500" },
  { name: "Sandwich", icon: "🥪", color: "from-indigo-500 to-blue-500" },
]

const trendingKeywords = ["Pizza", "Biryani", "Brownie", "Samosa", "Cold Coffee"]

const sortOptions = [
  { label: "Popular", value: "popular" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating" },
  { label: "Newest", value: "newest" },
]

export default function Menu() {
  const navigate = useNavigate()
  const { addToCart, getItemCount } = useCart()
  const [search, setSearch] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [focused, setFocused] = useState(false)
  const [category, setCategory] = useState("All")
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState(new Set())
  const [dealTimeLeft, setDealTimeLeft] = useState(0)
  const [viewMode, setViewMode] = useState("grid") // grid or list

  const dealDuration = 2 * 60 * 60 * 1000 // 2 hours
  const dealEnd = useRef(Date.now() + dealDuration)

  // Initial loading & countdown
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => {
      const diff = dealEnd.current - Date.now()
      setDealTimeLeft(diff > 0 ? diff : 0)
    }, 1000)
    return () => clearInterval(iv)
  }, [])

  // Autocomplete suggestions
  useEffect(() => {
    if (!search) {
      setSuggestions([])
      return
    }
    const matches = foodData
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 6)
      .map((item) => ({ name: item.name, category: item.category }))
    setSuggestions(matches)
  }, [search])

  // Filter and sort items
  const filteredItems = foodData
    .filter((item) => {
      const text = `${item.name} ${item.description}`.toLowerCase()
      const matchesText = text.includes(search.toLowerCase())
      const matchesCat = category === "All" || item.category === category
      return matchesText && matchesCat
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price
        case "price_desc":
          return b.price - a.price
        case "rating":
          return (b.rating || 4.5) - (a.rating || 4.5)
        case "newest":
          return b.id - a.id
        default:
          return 0 // popular - keep original order
      }
    })

  // Add to cart with enhanced feedback
  const handleAdd = (item, e) => {
    e?.stopPropagation()
    addToCart(item)
    toast.success(
      <div className="flex items-center gap-2">
        <span className="text-2xl">{categories.find((c) => c.name === item.category)?.icon || "🍽️"}</span>
        <div>
          <div className="font-semibold">{item.name}</div>
          <div className="text-sm opacity-80">Added to cart!</div>
        </div>
      </div>,
      {
        autoClose: 2000,
        className: "bg-gradient-to-r from-green-500 to-emerald-500",
      },
    )
  }

  // Toggle favorites
  const toggleFavorite = (itemId, e) => {
    e?.stopPropagation()
    const newFavorites = new Set(favorites)
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId)
      toast.info("Removed from favorites", { autoClose: 1000 })
    } else {
      newFavorites.add(itemId)
      toast.success("Added to favorites!", { autoClose: 1000 })
    }
    setFavorites(newFavorites)
  }

  // Format deal timer
  const hours = Math.floor(dealTimeLeft / 3600000)
  const minutes = Math.floor((dealTimeLeft % 3600000) / 60000)
  const seconds = Math.floor((dealTimeLeft % 60000) / 1000)

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
      <ToastContainer position="top-right" theme="colored" toastClassName="rounded-xl shadow-2xl" />

      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-white rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 px-4 py-8">
          {/* Notification Bell */}
          <motion.div
            className="absolute top-4 right-4 text-2xl cursor-pointer"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, delay: 1 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => toast.info("🔔 Notifications enabled!")}
          >
            <FaBell />
          </motion.div>

          {/* Title */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Delicious Menu 🍽️</h1>
            <p className="text-lg opacity-90">Discover amazing flavors from our kitchen</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <FaMapPin className="text-yellow-300" />
                <span>Bhopal, MP</span>
              </div>
              <div className="flex items-center gap-1">
                <FaClock className="text-yellow-300" />
                <span>25-30 min delivery</span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.div
            className="relative max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl transition-all duration-300 ${
                focused ? "ring-4 ring-white/30 scale-105" : ""
              }`}
            >
              <div className="flex items-center px-6 py-4">
                <FaSearch className="text-orange-500 text-xl mr-4" />
                <input
                  className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-lg"
                  type="text"
                  placeholder="Search for delicious food..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 200)}
                />
                {search && (
                  <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 ml-2">
                    ✕
                  </button>
                )}
              </div>

              {/* Enhanced Autocomplete */}
              <AnimatePresence>
                {suggestions.length > 0 && focused && (
                  <motion.div
                    className="border-t border-gray-200 bg-white rounded-b-2xl overflow-hidden"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {suggestions.map((sug, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        onMouseDown={() => setSearch(sug.name)}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {categories.find((c) => c.name === sug.category)?.icon || "🍽️"}
                          </span>
                          <span className="text-gray-900">{sug.name}</span>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{sug.category}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Trending Keywords */}
            {!search && (
              <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-center gap-2 text-sm text-white/80 mb-2">
                  <FaChartLine /> {/* Changed from FaTrendingUp */}
                  <span>Trending:</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {trendingKeywords.map((keyword, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setSearch(keyword)}
                      className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {keyword}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Deal Banner */}
      <motion.div
        className="mx-4 -mt-6 relative z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl text-white shadow-2xl overflow-hidden">
          <div className="relative p-6">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 animate-pulse"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  <FaFire className="text-3xl" />
                </motion.div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">🎉 Special Deal: ₹50 Off on Orders Over ₹300</div>
                  <div className="text-sm opacity-90">Limited time offer - Don't miss out!</div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm opacity-90 mb-1">Ends in</div>
                <div className="flex items-center gap-2 text-2xl font-bold">
                  <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                    {String(hours).padStart(2, "0")}
                  </div>
                  <span>:</span>
                  <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                    {String(minutes).padStart(2, "0")}
                  </div>
                  <span>:</span>
                  <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                    {String(seconds).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category & Filter Section */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-4 py-4">
          {/* Categories */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide mb-4">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  category === cat.name
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Filters & Sort */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FaFilter />
                <span>Filters</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">{filteredItems.length} items found</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="relative">
              <Lottie animationData={loaderAnimation} loop className="w-32 h-32" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Loading delicious food...</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Preparing the best dishes for you</div>
            </motion.div>
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                onClick={() => navigate(`/dish/${item.id}`)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg?height=200&width=200&text=Food"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const categoryImages = {
                        Pizza: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
                        Burger: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
                        Indian: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
                        Desserts: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
                        Beverages: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
                        Pasta: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
                        Sandwich: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop",
                      }
                      e.target.src = categoryImages[item.category] || categoryImages.Pizza
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <FaFire />
                      Popular
                    </div>
                  </div>

                  <div className="absolute top-3 right-3">
                    <motion.button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className={`p-2 rounded-full shadow-lg transition-colors ${
                        favorites.has(item.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/90 text-gray-600 hover:text-red-500"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaHeart />
                    </motion.button>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      {item.rating || 4.5}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <FaClock />
                      <span>25-30 min</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {item.description || "Delicious food item made with fresh ingredients"}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-orange-500">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                      )}
                    </div>

                    <motion.button
                      onClick={(e) => handleAdd(item, e)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTag />
                      Add
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No items found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Try adjusting your search or browse our trending items
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {trendingKeywords.map((keyword, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSearch(keyword)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {keyword}
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => {
                setSearch("")
                setCategory("All")
              }}
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </main>

      {/* Floating Cart Button */}
      <FloatingCartButton />
    </div>
  )
}
