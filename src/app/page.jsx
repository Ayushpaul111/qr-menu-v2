"use client";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
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
import Filter from "@/Components/Filter";
import SwipeToOrder from "@/Components/SwipeToOrder";
import SearchBar from "@/Components/SearchBar";

// Mock menu data directly in the component
const menuItems = [
  // Must Try Items 🔥
  {
    id: 1,
    name: "Truffle Mushroom Pizza",
    description: "Wild mushrooms, truffle oil, fresh mozzarella, and herbs",
    price: 499,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400",
    rating: 4.8,
    category: "Must Try🔥",
    isVeg: true,
  },
  {
    id: 2,
    name: "Wagyu Beef Burger",
    description:
      "Premium wagyu patty with caramelized onions and special sauce",
    price: 699,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    rating: 4.9,
    category: "Must Try🔥",
    isVeg: false,
  },
  {
    id: 3,
    name: "Seafood Paella",
    description: "Spanish rice with mixed seafood, saffron, and vegetables",
    price: 799,
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400",
    rating: 4.7,
    category: "Must Try🔥",
    isVeg: false,
  },

  // Pizzas
  {
    id: 4,
    name: "Margherita Pizza",
    description: "Classic tomato sauce, mozzarella, and fresh basil",
    price: 299,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
    rating: 4.5,
    category: "Pizza",
    isVeg: true,
  },
  {
    id: 5,
    name: "Pepperoni Pizza",
    description: "Spicy pepperoni with melted cheese and tomato sauce",
    price: 399,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
    rating: 4.6,
    category: "Pizza",
    isVeg: false,
  },
  {
    id: 6,
    name: "BBQ Chicken Pizza",
    description: "Grilled chicken, BBQ sauce, red onions, and cilantro",
    price: 449,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    rating: 4.4,
    category: "Pizza",
    isVeg: false,
  },
  {
    id: 7,
    name: "Veggie Supreme Pizza",
    description: "Bell peppers, mushrooms, olives, onions, and tomatoes",
    price: 349,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400",
    rating: 4.3,
    category: "Pizza",
    isVeg: true,
  },

  // Burgers
  {
    id: 8,
    name: "Classic Cheeseburger",
    description: "Beef patty with cheddar, lettuce, tomato, and pickles",
    price: 249,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    rating: 4.4,
    category: "Burgers",
    isVeg: false,
  },
  {
    id: 9,
    name: "Mushroom Swiss Burger",
    description: "Beef patty with sautéed mushrooms and Swiss cheese",
    price: 299,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400",
    rating: 4.5,
    category: "Burgers",
    isVeg: false,
  },
  {
    id: 10,
    name: "Veggie Burger",
    description: "Plant-based patty with avocado and chipotle mayo",
    price: 229,
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=400",
    rating: 4.3,
    category: "Burgers",
    isVeg: true,
  },
  {
    id: 11,
    name: "Spicy Chicken Burger",
    description: "Crispy chicken with jalapeños and spicy sauce",
    price: 269,
    image: "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=400",
    rating: 4.6,
    category: "Burgers",
    isVeg: false,
  },

  // Main Course
  {
    id: 12,
    name: "Grilled Salmon",
    description: "Fresh salmon with lemon butter sauce and asparagus",
    price: 599,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
    rating: 4.7,
    category: "Main Course",
    isVeg: false,
  },
  {
    id: 13,
    name: "Butter Chicken",
    description: "Tender chicken in rich tomato and butter sauce",
    price: 449,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
    rating: 4.8,
    category: "Main Course",
    isVeg: false,
  },
  {
    id: 14,
    name: "Vegetable Biryani",
    description: "Aromatic rice with mixed vegetables and saffron",
    price: 329,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
    rating: 4.4,
    category: "Main Course",
    isVeg: true,
  },
  {
    id: 15,
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon, eggs, and parmesan",
    price: 379,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
    rating: 4.5,
    category: "Main Course",
    isVeg: false,
  },
  {
    id: 16,
    name: "Vegetable Lasagna",
    description: "Layered pasta with vegetables and ricotta cheese",
    price: 399,
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400",
    rating: 4.3,
    category: "Main Course",
    isVeg: true,
  },
  {
    id: 17,
    name: "Beef Steak",
    description: "Grilled ribeye with mushroom sauce and mashed potatoes",
    price: 699,
    image: "https://images.unsplash.com/photo-1546241072-48010ad2862c?w=400",
    rating: 4.7,
    category: "Main Course",
    isVeg: false,
  },

  // Desserts
  {
    id: 18,
    name: "Chocolate Brownie",
    description: "Warm brownie with vanilla ice cream and chocolate sauce",
    price: 199,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
    rating: 4.8,
    category: "Desserts",
    isVeg: true,
  },
  {
    id: 19,
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee and mascarpone",
    price: 249,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
    rating: 4.6,
    category: "Desserts",
    isVeg: true,
  },
  {
    id: 20,
    name: "Cheesecake",
    description: "New York style cheesecake with berry compote",
    price: 279,
    image: "https://images.unsplash.com/photo-1508737027454-e6638a925182?w=400",
    rating: 4.7,
    category: "Desserts",
    isVeg: true,
  },
  {
    id: 21,
    name: "Apple Pie",
    description: "Warm apple pie with vanilla ice cream",
    price: 229,
    image: "https://images.unsplash.com/photo-1568571780765-9276235b0918?w=400",
    rating: 4.5,
    category: "Desserts",
    isVeg: true,
  },
  {
    id: 22,
    name: "Crème Brûlée",
    description: "Classic French dessert with caramelized sugar top",
    price: 299,
    image: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400",
    rating: 4.6,
    category: "Desserts",
    isVeg: true,
  },
  {
    id: 23,
    name: "Mango Sorbet",
    description: "Refreshing mango sorbet with fresh mint",
    price: 179,
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400",
    rating: 4.4,
    category: "Desserts",
    isVeg: true,
  },
  {
    id: 24,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center",
    price: 259,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
    rating: 4.9,
    category: "Desserts",
    isVeg: true,
  },
  {
    id: 25,
    name: "Ice Cream Sundae",
    description: "Assorted ice creams with nuts, sauce, and cherry",
    price: 219,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
    rating: 4.5,
    category: "Desserts",
    isVeg: true,
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
  const [isFocused, setIsFocused] = useState(false);

  const handleOrderComplete = () => {
    setShowOrderForm(true);
    // Add any additional order processing logic here
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
    // The slider will automatically reset when showOrderForm becomes false
  };

  const handleClear = () => {
    setSearchTerm("");
  };

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
    <div className=" flex flex-col min-h-screen bg-gray-50 min-w-full select-none">
      <BrandingBar position="top" />
      <div className="flex-1 p-6">
        <RestaurantHeader />

        {/* Search and Filters */}
        <div className="px-3 sm:px-4 py-3 sm:py-6">
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative rounded-lg shadow-md">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredItems={filteredItems}
              />
            </div>

            {/* Veg/Non-veg filter */}
            <Filter
              options={[
                { value: true, label: "Veg" },
                { value: false, label: "Non-veg" },
              ]}
              selectedValue={filterVeg}
              onChange={setFilterVeg}
              extraButtons={[
                {
                  label: "Call Waiter",
                  onClick: () => setShowWaiterCall(true),
                },
              ]}
            />
          </div>

          {/* Categories */}
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-24">
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
          <SwipeToOrder
            onOrderComplete={handleOrderComplete}
            isOrderFormOpen={showOrderForm}
          />
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
