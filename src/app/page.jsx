"use client";
import { useState } from "react";
import RestaurantHeader from "../Components/RestaurantHeader";
import MenuCategory from "../Components/MenuCategory";
import MenuItem from "../Components/MenuItem";
import CategoryMenu from "../Components/CategoryMenu";
import Cart from "../Components/Cart";
import confetti from "canvas-confetti";
import SuccessCard from "@/Components/SuccessCard";
import OrderForm from "@/Components/OrderForm";
import WaiterCallForm from "@/Components/WaiterCallForm";
import toast from "react-hot-toast";

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState(null);
  const [showWaiterCall, setShowWaiterCall] = useState(false);

  const categories = [
    { id: "Must Try", name: "Must Try 🔥" },
    { id: "Steamed Items", name: "Steamed Items" },
    { id: "Burgers", name: "Burgers" },
    { id: "cart", name: "Total Bill" },
  ];

  const handleIncrementItem = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item.name]: (prevCounts[item.name] || 0) + 1,
    }));
    toast.success(`${item.name} added to cart`);
  };

  const handleDecrementItem = (item) => {
    // Find the index of the first occurrence of the item to remove
    const indexToRemove = cartItems.findIndex(
      (cartItem) => cartItem.name === item.name
    );

    if (indexToRemove !== -1) {
      const newCartItems = cartItems.filter((_, i) => i !== indexToRemove);
      setCartItems(newCartItems);

      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [item.name]: Math.max((prevCounts[item.name] || 0) - 1, 0),
      }));

      toast(`${item.name} removed`, { icon: "🗑️" });
    }
  };

  const item = (name, price) => ({
    name,
    price,
    onAdd: () => handleAddToCart({ name, price }),
    onIncrement: () => handleIncrementItem({ name, price }),
    onDecrement: () => handleDecrementItem({ name, price }),
    count: itemCounts[name] || 0,
  });

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
    <div className="main-container relative">
      <div className="fixed w-full z-50 p-1 border-b text-xs flex items-center justify-center bg-gradient-to-tr from-[#f9f6fe] to-[#ffffff]">
        Created By&nbsp;
        <a
          href="https://ehike.in"
          className="bg-clip-text text-transparent bg-gradient-to-br from-[#723FCD] to-[#DB9FF5] font-bold italic"
        >
          Ehike
        </a>
      </div>
      <div className="container mx-auto p-6">
        <RestaurantHeader />

        {/* Category Menu */}
        <CategoryMenu categories={categories} />

        {/* Menu Items */}

        <MenuCategory id="Must Try" category="Must Try 🔥">
          <MenuItem
            {...item("Steamed chicken with toast", 90)}
            description="Toast served with steamed chicken."
            // price={90}
            imageUrl="https://www.onehappyhousewife.com/wp-content/uploads/2017/09/canned-chicken-ala-king-recipe-900x1200.jpg"
            rating={4.5}
          />
        </MenuCategory>
        <MenuCategory id="Steamed Items" category="Steamed Items">
          <MenuItem
            {...item("Veg Momo", 60)}
            description="Soft dumplings filled with cheese and veggies."
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcn5UVtu96GXeI2ffuiSHLHMdiqUjjH46ddg&s"
            rating={"8"}
            // reviews={10}
          />
          <MenuItem
            {...item("Chicken Momo", 60)}
            description="Steamed chicken-filled dumplings."
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvWweMLsRjFVayNya0dO9ue0xrZOGmgeWgBg&s"
            rating={"8"}
            // reviews={10}
          />
        </MenuCategory>
        <MenuCategory id="Burgers" category="Burgers">
          <MenuItem
            {...item("Crispy Burger", 50)}
            description="Crispy Burger"
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfPHnSzwK4Hlo5taS9JO36XX03MRdcNEu0yw&s"
            rating={4.5}
            // reviews={10}
          />
        </MenuCategory>

        <WaiterCallForm
          isVisible={showWaiterCall}
          onClose={() => setShowWaiterCall(false)}
        />
        <div className="pb-10">
          {cartItems.length !== 0 && (
            <>
              <button
                onClick={() => {
                  setShowOrderForm(true);
                  // const cartElement = document.getElementById("cart");
                  // if (cartElement) {
                  //   cartElement.scrollIntoView({
                  //     behavior: "smooth",
                  //     block: "start",
                  //   });
                  // }
                  // fireConfetti();
                }}
                className="fire-btn fixed z-40 bottom-8 left-[35%] text-white p-4 text-sm rounded-full shadow-lg transition-transform duration-300"
              >
                Order
              </button>
              <button
                onClick={() => {
                  // setShowOrderForm(true);
                  const cartElement = document.getElementById("cart");
                  if (cartElement) {
                    cartElement.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                  // fireConfetti();
                }}
                className="fire-btn fixed z-40 bottom-8 left-8 text-white p-4 text-sm rounded-full shadow-lg transition-transform duration-300"
              >
                Cart
              </button>
            </>
          )}
        </div>
        <OrderForm
          cartItems={cartItems}
          onSubmit={handleOrderSubmit}
          onCancel={() => setShowOrderForm(false)}
          isVisible={showOrderForm}
        />
        {showSuccess && successDetails && (
          <SuccessCard
            orderDetails={successDetails}
            onClose={handleSuccessClose}
          />
        )}
        <Cart
          id="cart"
          cartItems={cartItems}
          onIncrement={handleIncrementItem}
          onDecrement={handleDecrementItem}
        />
        <button
          onClick={() => setShowWaiterCall(true)}
          className="fire-btn fixed z-40 bottom-24 right-8 text-white p-4 text-sm rounded-full shadow-lg transition-transform duration-300"
        >
          Call Waiter
        </button>
      </div>
      <div className=" p-1 border-t text-xs flex items-center justify-center bg-gradient-to-tr from-[#f9f6fe] to-[#ffffff]">
        Created By&nbsp;
        <a
          href="https://ehike.in"
          className="bg-clip-text text-transparent bg-gradient-to-br from-[#723FCD] to-[#DB9FF5] font-bold italic"
        >
          Ehike
        </a>
      </div>
      <div className="container"></div>
    </div>
  );
}
