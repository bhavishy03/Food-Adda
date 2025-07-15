// src/data/foodData.js

/**
 * Base list of all menu items.
 * Every item from id 1 to 75 is preserved here.
 */
const baseData = [
  // 🍕 Pizzas
  { id: 1,  name: "Margherita Pizza",           category: "Pizza", price: 250, image: "/images/pizza/margherita.jpg" },
  { id: 2,  name: "Pepperoni Pizza",            category: "Pizza", price: 349, image: "/images/pizza/pepperoni.jpg" },
  { id: 3,  name: "Veggie Supreme Pizza",       category: "Pizza", price: 329, image: "/images/pizza/veggie-supreme.jpg" },
  { id: 4,  name: "Cheese Burst Pizza",         category: "Pizza", price: 399, image: "/images/pizza/cheese-burst.jpg" },
  { id: 5,  name: "BBQ Chicken Pizza",          category: "Pizza", price: 399, image: "/images/pizza/bbq-chicken.jpg" },
  { id: 6,  name: "Mexican Green Wave Pizza",   category: "Pizza", price: 369, image: "/images/pizza/mexican-green-wave.jpg" },

  // 🍔 Burgers
  { id: 7,  name: "Classic Chicken Burger",     category: "Burger", price: 199, image: "/images/burger/chicken-burger.jpg" },
  { id: 8,  name: "Veggie Burger",              category: "Burger", price: 149, image: "/images/burger/veggie-burger.jpg" },
  { id: 9,  name: "Paneer Burger",              category: "Burger", price: 179, image: "/images/burger/paneer-burger.jpg" },
  { id: 10, name: "Double Patty Burger",        category: "Burger", price: 229, image: "/images/burger/double-patty.jpg" },
  { id: 11, name: "Spicy Paneer Burger",        category: "Burger", price: 179, image: "/images/burger/spicy-paneer.jpg" },
  { id: 12, name: "Egg Burger",                 category: "Burger", price: 189, image: "/images/burger/egg-burger.jpg" },
  { id: 14, name: "Aloo Tikki Burger",          category: "Burger", price: 129, image: "/images/burger/aloo-tikki.jpg" },

  // 🍛 Indian Dishes
  { id: 15, name: "Butter Chicken",             category: "Indian", price: 299, image: "/images/indian/butter-chicken.jpg" },
  { id: 16, name: "Paneer Tikka Masala",        category: "Indian", price: 249, image: "/images/indian/paneer-tikka.jpg" },
  { id: 17, name: "Dal Makhani",                category: "Indian", price: 199, image: "/images/indian/dal-makhani.jpg" },
  { id: 18, name: "Chicken Biryani",            category: "Indian", price: 269, image: "/images/indian/chicken-biryani.jpg" },
  { id: 19, name: "Chole Bhature",              category: "Indian", price: 149, image: "/images/indian/chole-bhature.jpg" },
  { id: 20, name: "Rajma Chawal",               category: "Indian", price: 129, image: "/images/indian/rajma-chawal.jpg" },
  { id: 21, name: "Pav Bhaji",                  category: "Indian", price: 249, image: "/images/indian/Pav-Bhaji.jpg" },

  // 🥡 Chinese
  { id: 22, name: "Veg Hakka Noodles",          category: "Chinese", price: 149, image: "/images/chinese/hakka-noodles.jpg" },
  { id: 23, name: "Chicken Manchurian",         category: "Chinese", price: 189, image: "/images/chinese/chicken-manchurian.jpg" },
  { id: 24, name: "Spring Rolls",               category: "Chinese", price: 129, image: "/images/chinese/spring-rolls.jpg" },
  { id: 25, name: "Chilli Paneer",              category: "Chinese", price: 179, image: "/images/chinese/chilli-paneer.jpg" },

  // 🍟 Snacks
  { id: 26, name: "French Fries",               category: "Snacks", price: 89,  image: "/images/snacks/french-fries.jpg" },
  { id: 27, name: "Cheesy Nachos",              category: "Snacks", price: 119, image: "/images/snacks/nachos.jpg" },
  { id: 28, name: "Onion Rings",                category: "Snacks", price: 99,  image: "/images/snacks/onion-rings.jpg" },
  { id: 29, name: "Tandoori Paneer Pizza",      category: "Pizza",  price: 369, image: "/images/pizza/tandoori-paneer.jpg" },
  { id: 31, name: "Paneer Roll",                category: "Rolls",  price: 109, image: "/images/rolls/paneer-roll.jpg" },
  { id: 32, name: "Chicken Kathi Roll",         category: "Rolls",  price: 139, image: "/images/rolls/chicken-roll.jpg" },
  { id: 33, name: "Samosa",                     category: "Kachori",price: 25,  image: "/images/snacks/kachori.jpg" },
  { id: 34, name: "Vada Pav",                   category: "Snacks", price: 30,  image: "/images/snacks/vada-pav.jpg" },
  { id: 38, name: "Poha",                       category: "Indian", price: 30,  image: "/images/indian/poha.jpg" },
  { id: 39, name: "Smosa",                      category: "Indian", price: 40,  image: "/images/indian/smosa.jpg" },
  { id: 40, name: "Idli Sambar",                category: "Indian", price: 89,  image: "/images/indian/idli-sambar.jpg" },
  { id: 41, name: "Dosa",                       category: "Indian", price: 99,  image: "/images/indian/dosa.jpg" },
  { id: 42, name: "Upma",                       category: "Indian", price: 79,  image: "/images/indian/upma.jpg" },

  // 🍝 Pasta
  { id: 43, name: "White Sauce Pasta",          category: "Pasta", price: 169, image: "/images/pasta/white-sauce.jpg" },
  { id: 44, name: "Red Sauce Pasta",            category: "Pasta", price: 159, image: "/images/pasta/red-sauce.jpg" },
  { id: 45, name: "Mac & Cheese",               category: "Pasta", price: 199, image: "/images/pasta/mac-cheese.jpg" },
  { id: 46, name: "Creamy Alfredo Pasta",       category: "Pasta", price: 279, image: "/images/pasta/alfredo.jpg" },
  { id: 47, name: "Spaghetti Bolognese",        category: "Pasta", price: 299, image: "/images/pasta/spaghetti.jpg" },
  { id: 48, name: "Penne Arrabbiata",           category: "Pasta", price: 259, image: "/images/pasta/penne.jpg" },

  // 🥪 Sandwiches
  { id: 49, name: "Grilled Sandwich",           category: "Sandwich", price: 149, image: "/images/sandwich/grilled.jpg" },
  { id: 50, name: "Veg Cheese Sandwich",        category: "Sandwich", price: 129, image: "/images/sandwich/cheese.jpg" },
  { id: 51, name: "Paneer Tikka Sandwich",      category: "Sandwich", price: 169, image: "/images/sandwich/paneer-tikka.jpg" },

  // 🍰 Desserts
  { id: 52, name: "Chocolate Brownie",          category: "Dessert", price: 99,  image: "/images/dessert/brownie.jpg" },
  { id: 53, name: "Gulab Jamun",                category: "Dessert", price: 79,  image: "/images/dessert/gulab-jamun.jpg" },
  { id: 54, name: "Rasmalai",                   category: "Dessert", price: 89,  image: "/images/dessert/rasmalai.jpg" },
  { id: 57, name: "Ice Cream Sundae",           category: "Dessert", price: 139, image: "/images/dessert/sundae.jpg" },
  { id: 58, name: "Rasgulla",                   category: "Dessert", price: 89,  image: "/images/dessert/rasgulla.jpg" },
  { id: 60, name: "Kaju Katli",                 category: "Dessert", price: 199, image: "/images/dessert/kaju-katli.jpg" },
  { id: 61, name: "Soan Papdi",                 category: "Dessert", price: 99,  image: "/images/dessert/soan-papdi.jpg" },
  { id: 63, name: "Cheesecake",                 category: "Dessert", price: 179, image: "/images/dessert/cheesecake.jpg" },

  // 🍹 Beverages
  { id: 66, name: "Coca Cola",                  category: "Beverages", price: 49, image: "/images/beverages/coke.jpg" },
  { id: 67, name: "Masala Chai",                category: "Beverages", price: 49, image: "/images/beverages/masala-chai.jpg" },
  { id: 68, name: "Cold Coffee",                category: "Beverages", price: 89, image: "/images/beverages/cold-coffee.jpg" },
  { id: 69, name: "Lemon Iced Tea",             category: "Beverages", price: 69, image: "/images/beverages/iced-tea.jpg" },
  { id: 70, name: "Orange Juice",               category: "Beverages", price: 79, image: "/images/beverages/orange-juice.jpg" },
  { id: 71, name: "Strawberry Shake",           category: "Beverages", price: 99, image: "/images/beverages/strawberry-shake.jpg" },
  { id: 72, name: "Espresso Coffee",            category: "Beverages", price: 69, image: "/images/beverages/espresso.jpg" },
  { id: 74, name: "Apple Juice",                category: "Beverages", price: 75, image: "/images/beverages/apple-juice.jpg" },
  { id: 75, name: "Lassi",                      category: "Beverages", price: 60, image: "/images/beverages/lassi.jpg" }
];

/**
 * Enrich each item with:
 * 1) description: tasty one-liner
 * 2) recommended: three peers from same category (IDs as strings)
 */
const foodData = baseData.map(item => {
  // pick up to 3 other items in same category
  const peers = baseData.filter(other => other.category === item.category && other.id !== item.id);
  const recommended = peers.slice(0, 3).map(other => String(other.id));

  return {
    ...item,
    description: `Enjoy our ${item.name}, made fresh with premium ingredients and authentic flavors.`,
    recommended
  };
});

export default foodData;
