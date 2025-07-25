"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import foodData from "../data/foodData"
import { useCart } from "../context/CartContext"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import {
  Star,
  ArrowRight,
  Truck,
  Users,
  CheckCircle,
  Gift,
  MapPin,
  Clock,
  Heart,
  ShoppingCart,
  Play,
  Award,
  Zap,
} from "lucide-react"
import axios from "../utils/axios"
import FloatingCartButton from "../components/FloatingCartButton"

const Homepage = ({ onAddToCart }) => {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [foods, setFoods] = useState([]) // Start with empty array
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentSlide, setCurrentSlide] = useState(0)

 useEffect(() => {
  const loadFoods = async () => {
    try {
      const response = await axios.get("/food");

      if (response.data && response.data.length > 0) {
        setFoods(response.data);
      } else {
        throw new Error("No API data");
      }
    } catch (err) {
      console.error("Foods fetch error:", err);
      setFoods(foodData); // fallback data
    }
  };

  loadFoods();
}, []);

  const sliderImages = [
    {
      src: "/posters/burger.jpg",
      title: "Delicious Burgers",
      subtitle: "Starting from ₹99",
    },
    {
      src: "/posters/paneer.jpg",
      title: "Fresh Paneer Dishes",
      subtitle: "Authentic Indian Flavors",
    },
    {
      src: "/posters/dessert.jpg",
      title: "Sweet Desserts",
      subtitle: "Perfect End to Your Meal",
    },
  ]

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [sliderImages.length])



  const categories = foods.length > 0 ? ["All", ...Array.from(new Set(foods.map((item) => item.category)))] : ["All"]

  const filteredItems = foods.filter((item) => (activeCategory === "All" ? true : item.category === activeCategory))

  const featuredItems = filteredItems.slice(0, 10) // Show 10 items instead of 6

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderImages.length - 1 : currentSlide - 1)
  }

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === sliderImages.length - 1 ? 0 : currentSlide + 1)
  }

  // Function to handle dish click - navigate to dish details
  const handleDishClick = (item) => {
    navigate(`/dish/${item._id || item.id}`, { state: { dish: item } })
  }

  // Function to handle add to cart (prevent event bubbling)
  const handleAddToCart = (e, item) => {
    e.stopPropagation() // Prevent dish click when clicking add to cart
    ;(onAddToCart || addToCart)(item)
  }

  // Function to handle heart click (prevent event bubbling)
  const handleHeartClick = (e, item) => {
    e.stopPropagation() // Prevent dish click when clicking heart
    // Add to favorites logic here
    console.log("Added to favorites:", item.name)
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Slider Section */}
      <section className="relative h-[450px] md:h-[600px] overflow-hidden mb-8 mx-4 md:mx-0">
        <div className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          {sliderImages.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <img
                src={slide.src || "/placeholder.svg"}
                alt={slide.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to Unsplash food images
                  const foodImages = [
                    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop&crop=center", // burger
                    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center", // paneer
                    "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop&crop=center", // dessert
                  ]
                  e.target.src = foodImages[index] || foodImages[0]
                }}
              />

              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Animated Background Elements */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse" />
              <div
                className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />

              {/* Slide Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full px-6 md:px-12 lg:px-20">
                  <div className="max-w-2xl">
                    {/* Badge */}
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-4 md:mb-6">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse" />
                      <span className="text-white/90 text-sm font-medium">Featured Today</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight">
                      {slide.title.split(" ").map((word, i) => (
                        <span
                          key={i}
                          className={i === slide.title.split(" ").length - 1 ? "block text-orange-400" : "block"}
                        >
                          {word}
                          {i !== slide.title.split(" ").length - 1 ? " " : ""}
                        </span>
                      ))}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 font-medium">{slide.subtitle}</p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <button
                        onClick={() => navigate("/menu")}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 group flex items-center"
                      >
                        <span className="mr-2">🍽️</span>
                        Order Now
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full px-6 py-3 text-lg backdrop-blur-sm bg-white/5 transition-all duration-300 flex items-center"
                        onClick={() => navigate("/menu")}
                      >
                        <Play className="mr-2 w-5 h-5" />
                        View Menu
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 mt-8 text-white/80">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">25 min delivery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">4.8 rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Enhanced Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative transition-all duration-300 ${index === currentSlide ? "w-8 h-3" : "w-3 h-3"}`}
              >
                <div
                  className={`w-full h-full rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-gradient-to-r from-orange-400 to-red-400"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Navigation Arrows for Desktop */}
          <div className="hidden md:block">
            <button
              onClick={handlePrevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>

            <button
              onClick={handleNextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Swipe Indicator */}
          <div className="md:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-white/60 text-sm">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" />
              <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
            <span>Swipe for more</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 px-6 py-2 rounded-full mb-6">
            <Zap className="w-5 h-5 text-orange-500 mr-2" />
            <span className="text-orange-600 dark:text-orange-400 font-medium">Welcome to FOOD ADDA</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent leading-tight">
            We Serve the Taste You Love 
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover delicious meals from top chefs. Order online or enjoy doorstep delivery with our premium service.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/menu")}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center"
            >
              🍽️ Explore Menu
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="rounded-full px-8 py-4 text-lg border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-900/20 bg-transparent flex items-center">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </section>

        {/* Rewards Section */}
        <section className="mb-12">
          <div className="max-w-md mx-auto">
            <Card className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-6 text-white text-center relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />

                <div className="relative z-10">
                  <Gift className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">🎉 Congratulations!</h3>
                  <p className="text-lg mb-4">
                    You've earned <span className="text-3xl font-bold">₹92</span> in rewards!
                  </p>
                  <button
                    className="bg-white text-orange-600 hover:bg-gray-100 rounded-full px-6 py-2 font-semibold shadow-lg transition-colors"
                    onClick={() => alert("Redeem feature coming soon!")}
                  >
                    Redeem Now
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Category Filters */}
        <section className="mb-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 rounded-full px-6 py-2 font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-900/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Items */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Star className="w-8 h-8 text-orange-500" />
              Popular Dishes ({featuredItems.length})
            </h2>
            <button
              className="text-orange-500 hover:text-orange-600 flex items-center"
              onClick={() => navigate("/menu")}
            >
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          {featuredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No dishes available at the moment.</p>
              <p className="text-gray-400 text-sm mt-2">Please check back later or try refreshing the page.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredItems.map((item) => (
                <Card
                  key={item._id || item.id}
                  className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border-0 shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => handleDishClick(item)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to category-specific Unsplash images
                        const categoryImages = {
                          Pizza:
                            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
                          Burger:
                            "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center",
                          Indian:
                            "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&crop=center",
                          Chinese:
                            "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&h=300&fit=crop&crop=center",
                          Dessert:
                            "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center",
                          Pasta:
                            "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center",
                          Beverages:
                            "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center",
                          Snacks:
                            "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=300&fit=crop&crop=center",
                        }
                        e.target.src = categoryImages[item.category] || categoryImages.Pizza
                      }}
                    />
                    <div className="absolute top- right-3">
                      <button
                        className="rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-200"
                        onClick={(e) => handleHeartClick(e, item)}
                      >
                        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-orange-500 text-white flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        {item.rating || 4.5}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {item.description || "Delicious food item made with fresh ingredients"}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-orange-500">₹{item.price}</div>
                      <button
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full px-4 py-2 shadow-lg flex items-center transition-all duration-300 hover:scale-105"
                        onClick={(e) => handleAddToCart(e, item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">💡 Why Choose Us</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the best food delivery service with unmatched quality and convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="w-12 h-12" />,
                title: "Fast Delivery",
                description: "Doorstep delivery within 30 mins with real-time tracking",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <CheckCircle className="w-12 h-12" />,
                title: "Quality Ingredients",
                description: "Fresh, hygienic, and chef-approved meals every time",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Loved by Thousands",
                description: "Trusted by 20,000+ happy foodies across the city",
                color: "from-purple-500 to-pink-500",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border-0 shadow-lg text-center"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              💬 What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Real reviews from our satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                text: "FOOD ADDA never fails to impress! The delivery is quick and the food tastes like heaven. Best food delivery app I've used!",
                author: "Rohan",
                location: "Bhopal",
                rating: 5,
              },
              {
                text: "The app is smooth and the UI makes ordering so fun. Loyalty points system is super cool! Highly recommended.",
                author: "Priya",
                location: "Jabalpur",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.author[0]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{testimonial.author}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Track Order Banner */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12 text-white text-center relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16" />

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <MapPin className="w-12 h-12 mr-3" />
                  <h2 className="text-3xl md:text-4xl font-bold">Track Your Order Live</h2>
                </div>
                <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Stay updated with real-time delivery tracking and notifications. Know exactly when your food arrives!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    className="bg-white text-orange-600 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold shadow-lg flex items-center transition-colors"
                    onClick={() => navigate("/orders")}
                  >
                    <Clock className="mr-2 w-5 h-5" />
                    Track My Order
                  </button>
                  <div className="flex items-center text-white/80">
                    <Award className="w-5 h-5 mr-2" />
                    <span>Average delivery: 25 mins</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Floating Cart Button */}
      <FloatingCartButton />
    </div>
  )
}

export default Homepage
