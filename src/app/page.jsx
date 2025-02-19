"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import RestaurantHeader from "../Components/RestaurantHeader";
import MenuItem from "../Components/MenuItem";
import WaiterCallForm from "../Components/WaiterCallForm";
import Cart from "../Components/Cart";
import confetti from "canvas-confetti";
import SuccessCard from "../Components/SuccessCard";
import OrderForm from "../Components/OrderForm";
import toast from "react-hot-toast";
import BrandingBar from "../Components/BrandingBar";
import Categories from "../Components/Categories";

const menuItems = [
  {
    id: "1",
    name: "Garden Fresh Pizza",
    price: 100,
    description: "Loaded with fresh vegetables and herbs",
    category: "Pizza",
    isVeg: true,
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg", // Garden Fresh Pizza
    rating: 4.5,
  },
  {
    id: "2",
    name: "Classic Chicken Burger",
    price: 199,
    description: "Juicy chicken patty with fresh lettuce",
    category: "Burgers",
    isVeg: false,
    image: "https://images.pexels.com/photos/1639566/pexels-photo-1639566.jpeg", // Classic Chicken Burger
    rating: 4.8,
  },
  {
    id: "3",
    name: "Paneer Tikka",
    price: 249,
    description: "Grilled cottage cheese with Indian spices",
    category: "Main Course",
    isVeg: true,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg", // Paneer Tikka
    rating: 4.3,
  },
  {
    id: "4",
    name: "Chocolate Brownie",
    price: 149,
    description: "Rich chocolate brownie with vanilla ice cream",
    category: "Desserts",
    isVeg: true,
    image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg", // Chocolate Brownie
    rating: 4.7,
  },
  {
    id: "5",
    name: "Spicy Chicken Masala",
    price: 279,
    description: "Fiery chicken curry with traditional spices",
    category: "Must Try🔥",
    isVeg: false,
    image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg", // Spicy Chicken Masala
    rating: 4.9,
  },
  {
    id: "6",
    name: "Vegetable Lasagna",
    price: 229,
    description: "Layered pasta with fresh vegetables and cheese",
    category: "Main Course",
    isVeg: true,
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg", // Vegetable Lasagna
    rating: 4.4,
  },
  {
    id: "7",
    name: "BBQ Pulled Pork Sandwich",
    price: 249,
    description: "Slow-cooked pulled pork with tangy BBQ sauce",
    category: "Burgers",
    isVeg: false,
    image: "https://images.pexels.com/photos/1639566/pexels-photo-1639566.jpeg", // BBQ Pulled Pork Sandwich
    rating: 4.7,
  },
  {
    id: "8",
    name: "Greek Salad",
    price: 189,
    description: "Fresh greens with feta, olives, and Mediterranean dressing",
    category: "Main Course",
    isVeg: true,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg", // Greek Salad
    rating: 4.3,
  },
  {
    id: "9",
    name: "Seafood Paella",
    price: 299,
    description: "Spanish rice dish with mixed seafood",
    category: "Must Try🔥",
    isVeg: false,
    image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg", // Seafood Paella
    rating: 4.8,
  },
  {
    id: "10",
    name: "Margherita Pizza",
    price: 129,
    description: "Classic pizza with fresh mozzarella and basil",
    category: "Pizza",
    isVeg: true,
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg", // Margherita Pizza
    rating: 4.6,
  },
  {
    id: "11",
    name: "Vegan Buddha Bowl",
    price: 219,
    description: "Colorful bowl with roasted vegetables and quinoa",
    category: "Main Course",
    isVeg: true,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg", // Vegan Buddha Bowl
    rating: 4.5,
  },
  {
    id: "12",
    name: "Crispy Fish Tacos",
    price: 259,
    description: "Battered fish with fresh slaw and lime",
    category: "Must Try🔥",
    isVeg: false,
    image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg", // Crispy Fish Tacos
    rating: 4.7,
  },
  {
    id: "13",
    name: "Mushroom Risotto",
    price: 239,
    description: "Creamy rice with wild mushrooms and parmesan",
    category: "Main Course",
    isVeg: true,
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg", // Mushroom Risotto
    rating: 4.4,
  },
  {
    id: "14",
    name: "Korean BBQ Burger",
    price: 269,
    description: "Spicy Korean-style burger with kimchi",
    category: "Burgers",
    isVeg: false,
    image: "https://images.pexels.com/photos/1639566/pexels-photo-1639566.jpeg", // Korean BBQ Burger
    rating: 4.6,
  },
  {
    id: "15",
    name: "Tiramisu",
    price: 169,
    description: "Classic Italian coffee-flavored dessert",
    category: "Desserts",
    isVeg: true,
    image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg", // Tiramisu
    rating: 4.8,
  },
  {
    id: "16",
    name: "Vegetarian Pizza",
    price: 189,
    description: "Pizza topped with assorted fresh vegetables",
    category: "Pizza",
    isVeg: true,
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg", // Vegetarian Pizza
    rating: 4.5,
  },
  {
    id: "17",
    name: "Grilled Salmon",
    price: 289,
    description: "Fresh salmon with herb butter sauce",
    category: "Must Try🔥",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    rating: 4.9,
  },
  {
    id: "18",
    name: "Apple Pie",
    price: 139,
    description: "Homestyle apple pie with vanilla ice cream",
    category: "Desserts",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    rating: 4.6,
  },
  {
    id: "19",
    name: "Vegetable Spring Rolls",
    price: 179,
    description: "Crispy rolls filled with mixed vegetables",
    category: "Main Course",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    rating: 4.3,
  },
  {
    id: "20",
    name: "Chicken Quesadilla",
    price: 209,
    description: "Cheese and chicken-filled tortilla",
    category: "Must Try🔥",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    rating: 4.7,
  },
];

const categories = [
  "All",
  "Must Try🔥",
  "Pizza",
  "Burgers",
  "Main Course",
  "Desserts",
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterVeg, setFilterVeg] = useState(null);
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showWaiterCall, setShowWaiterCall] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});

  useEffect(() => {
    let filtered = menuItems;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (filterVeg !== null) {
      filtered = filtered.filter((item) => item.isVeg === filterVeg);
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, filterVeg]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }

    // You can remove the setItemCounts call as we're now using the quantity property
    toast.success(`${item.name} added to cart`);
  };

  const removeFromCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      if (existingItem.quantity === 1) {
        setCartItems((prevItems) =>
          prevItems.filter((cartItem) => cartItem.id !== item.id)
        );
      } else {
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        );
      }

      // You can remove the setItemCounts call as we're now using the quantity property
      toast(`${item.name} removed`, { icon: "🗑️" });
    }
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 300,
      spread: 90,
      origin: { x: 1, y: 0.9 },
    });

    confetti({
      particleCount: 300,
      spread: 90,
      origin: { x: 0, y: 0.9 },
    });
  };

  const handleOrderSubmit = async (orderDetails) => {
    const orderToast = toast.loading("Submitting order...");
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Order placed successfully!", { id: orderToast });

        const successData = {
          ...orderDetails,
          orderTime: new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        };
        setSuccessDetails(successData);
        setShowOrderForm(false);
        setShowSuccess(true);
        fireConfetti();
      } else {
        toast.error(`Order submission failed: ${result.message}`, {
          id: orderToast,
        });
      }
    } catch (error) {
      toast.error("Error submitting order", { id: orderToast });
      console.error("Error submitting order from page.jsx:", error.message);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setCartItems([]);
    setItemCounts({});
    setSuccessDetails(null);
  };

  return (
    <div className=" flex flex-col min-h-screen bg-gray-50 ">
      <BrandingBar position="top" />
      <div className="flex-1 container mx-auto p-6">
        <RestaurantHeader />

        {/* Search and Filters */}
        <div className="px-3 sm:px-4 py-3 sm:py-6">
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative rounded-lg shadow-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu..."
                className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Veg/Non-veg filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 justify-center">
              <button
                onClick={() => setFilterVeg(true)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg border flex-shrink-0 text-sm sm:text-base ${
                  filterVeg === true
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 transform -translate-y-0.5"
                    : "bg-white text-gray-600 hover:bg-orange-50"
                }`}
              >
                Veg
              </button>
              <button
                onClick={() => setFilterVeg(false)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg border flex-shrink-0 text-sm sm:text-base ${
                  filterVeg === false
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 transform -translate-y-0.5"
                    : "bg-white text-gray-600 hover:bg-orange-50"
                }`}
              >
                Non-veg
              </button>
              <button
                onClick={() => setFilterVeg(null)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg border bg-orange-500 flex-shrink-0 text-sm sm:text-base ${
                  filterVeg === null
                    ? "text-white border-orange-500"
                    : "bg-white text-gray-600 hover:bg-orange-50 border-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setShowWaiterCall(true)}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg border bg-green-600 text-white border-gray-200 flex-shrink-0 text-sm sm:text-base"
              >
                Call Waiter
              </button>
            </div>
          </div>

          {/* Categories */}
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-24">
            {filteredItems.map((item) => {
              const cartItem = cartItems.find(
                (cartItem) => cartItem.id === item.id
              );
              const count = cartItem ? cartItem.quantity : 0;

              return (
                <MenuItem
                  key={item.id}
                  {...item}
                  count={count}
                  onIncrement={() => addToCart(item)}
                  onDecrement={() => removeFromCart(item)}
                />
              );
            })}
          </div>
        </div>

        {/* Fixed Buttons */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-10 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 z-40">
            <button
              onClick={() => setShowOrderForm(true)}
              className="bg-orange-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
            >
              Place Order
            </button>
          </div>
        )}

        {/* Modals */}
        <OrderForm
          isVisible={showOrderForm}
          onClose={() => setShowOrderForm(false)}
          onSubmit={handleOrderSubmit}
          cartItems={cartItems}
        />

        <WaiterCallForm
          isVisible={showWaiterCall}
          onClose={() => setShowWaiterCall(false)}
        />

        {showSuccess && successDetails && (
          <SuccessCard
            orderDetails={successDetails}
            onClose={handleSuccessClose}
          />
        )}

        {/* Cart */}
        <Cart
          items={cartItems}
          onIncrement={addToCart}
          onDecrement={removeFromCart}
        />

        <div className="container"></div>
      </div>
      <BrandingBar position="bottom" />
    </div>
  );
}
