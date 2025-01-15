// pages/index.js
"use client";
import RestaurantHeader from "../Components/RestaurantHeader";
import MenuCategory from "../Components/MenuCategory";
import MenuItem from "../Components/MenuItem";
import CategoryMenu from "../Components/CategoryMenu";
import Cart from "../Components/Cart";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const categories = [
    { id: "Must Try", name: "Must Try 🔥" },
    { id: "Fried Items", name: "Fried Items" },
    { id: "Steamed Items", name: "Steamed Items" },
    { id: "Noodles Items", name: "Noodles Items" },
    { id: "Snacks", name: "Snacks" },
    { id: "Roll Items", name: "Roll Items" },
    { id: "Chilli Items", name: "Chilli Items" },
    { id: "Burgers", name: "Burgers" },
    { id: "Combo Offers", name: "Combo Offers ❤️" },
    { id: "Hot & Cold", name: "Hot & Cold" },
    { id: "cart", name: "Total Bill" },
  ];

  const handleAddToCart = (item) => {
    // Add item to cart
    setCartItems((prevItems) => [...prevItems, item]);

    // Update count
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item.name]: (prevCounts[item.name] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (index) => {
    // Get the item that will be removed
    const itemToRemove = cartItems[index];

    // Remove item from cart
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);

    // Decrease the count of the item
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemToRemove.name]: Math.max(
        (prevCounts[itemToRemove.name] || 0) - 1,
        0
      ),
    }));
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
            name="Bread Toast + Steamed Chicken"
            description="Toast served with steamed chicken."
            price={90}
            imageUrl="https://www.onehappyhousewife.com/wp-content/uploads/2017/09/canned-chicken-ala-king-recipe-900x1200.jpg"
            rating={4.5}
            onAdd={() =>
              handleAddToCart({
                name: "Bread Toast + Steamed Chicken",
                price: 90,
              })
            }
            count={itemCounts["Bread Toast + Steamed Chicken"] || 0}
            // reviews={10}
          />
        </MenuCategory>
        <MenuCategory id="Fried Items" category="Fried Items">
          <MenuItem
            name="Veg Pakoda"
            description="12 pieces of Crispy fried vegetable fritters."
            price={40}
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnJjmFn2li9md0DP33N2W1X1t4ZtIaLkyUdw&s"
            rating={4.5}
            onAdd={() => handleAddToCart({ name: "Veg Pakoda", price: 40 })}
            count={itemCounts["Veg Pakoda"] || 0}
            // reviews={10}
          />
          <MenuItem
            name="Paneer Pakoda"
            description="Fried paneer bites with a crispy coating."
            price={90}
            imageUrl="https://pipingpotcurry.com/wp-content/uploads/2022/10/Paneer-Pakora-Recipe-Piping-Pot-Curry.jpg"
            rating={4.5}
            onAdd={() => handleAddToCart({ name: "Paneer Pakoda", price: 90 })}
            count={itemCounts["Paneer Pakoda"] || 0}
            // reviews={10}
          />
        </MenuCategory>

        <MenuCategory id="Steamed Items" category="Steamed Items">
          <MenuItem
            name="Veg Momo"
            description="Soft dumplings filled with cheese and veggies."
            price={50}
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcn5UVtu96GXeI2ffuiSHLHMdiqUjjH46ddg&s"
            rating={4.5}
            onAdd={() => handleAddToCart({ name: "Veg Momo", price: 50 })}
            count={itemCounts["Veg Momo"] || 0}
            // reviews={10}
          />
          <MenuItem
            name="Chicken Momo"
            description="Steamed chicken-filled dumplings."
            price={60}
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvWweMLsRjFVayNya0dO9ue0xrZOGmgeWgBg&s"
            rating={4.5}
            onAdd={() => handleAddToCart({ name: "Chicken Momo", price: 60 })}
            count={itemCounts["Chicken Momo"] || 0}
            // reviews={10}
          />
        </MenuCategory>

        <MenuCategory id="Noodles Items" category="Noodles Items">
          <MenuItem
            name="Veg Masala Maggi"
            description="Stir-fried noodles with vegetables."
            price={60}
            imageUrl="https://www.secondrecipe.com/wp-content/uploads/2020/04/vegetable-maggi-noodles.jpg"
            rating={4.5}
            onAdd={() =>
              handleAddToCart({ name: "Veg Masala Maggi", price: 60 })
            }
            count={itemCounts["Veg Masala Maggi"] || 0}
            // reviews={10}
          />
          <MenuItem
            name="Veg Chowmin"
            description="Stir-fried noodles with vegetables."
            price={60}
            imageUrl="https://www.chefkunalkapur.com/wp-content/uploads/2021/03/veg-chowmein-min-1300x867.jpg?v=1620296035"
            rating={4.5}
            onAdd={() => handleAddToCart({ name: "Veg Chowmin", price: 60 })}
            count={itemCounts["Veg Chowmin"] || 0}
            // reviews={10}
          />
        </MenuCategory>
        <MenuCategory id="Snacks" category="Snacks">
          <MenuItem
            name="Bread Butter Toast"
            description="Crispy toast with butter."
            price={30}
            imageUrl="https://images.eatthismuch.com/img/254567_ldementhon_b5307778-b72b-4510-a611-c62a8099f23b.png"
            rating={4.5}
            onAdd={() =>
              handleAddToCart({ name: "Bread Butter Toast", price: 30 })
            }
            count={itemCounts["Bread Butter Toast"] || 0}
            // reviews={10}
          />
          <MenuItem
            name="Egg Butter Poch"
            description="Egg made with butter."
            price={20}
            imageUrl="https://c8.alamy.com/comp/2EAHGBD/egg-poach-sunny-side-up-a-healthy-food-ingredient-on-a-plate-2EAHGBD.jpg"
            rating={4.5}
            onAdd={() =>
              handleAddToCart({ name: "Egg Butter Poch", price: 20 })
            }
            count={itemCounts["Egg Butter Poch"] || 0}
            // reviews={10}
          />
        </MenuCategory>
        <MenuCategory id="Roll Items" category="Roll Items">
          <MenuItem
            name="Egg Roll"
            description="Egg-wrapped roll with fillings."
            price={30}
            imageUrl="https://ministryofcurry.com/wp-content/uploads/2023/11/Kolkatta-Egg-Roll-4.jpg"
            rating={4.5}
            onAdd={() => handleAddToCart({ name: "Egg Roll", price: 30 })}
            count={itemCounts["Egg Roll"] || 0}
            // reviews={10}
          />
          <MenuItem
            name="Egg Chicken Roll"
            description="Roll stuffed with chicken and egg."
            price={70}
            imageUrl="https://notoutofthebox.in/wp-content/uploads/2014/09/c11.jpg"
            rating={4.5}
            onAdd={() =>
              handleAddToCart({ name: "Egg Chicken Roll", price: 70 })
            }
            count={itemCounts["Egg Chicken Roll"] || 0}
            // reviews={10}
          />
        </MenuCategory>
        <MenuCategory id="Chilli Items" category="Chilli Items">
          <MenuItem
            name="Chilli Panner"
            description="Paneer cubes stir-fried with spices."
            price={120}
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTblu8dggMGONpuiCjbl0ze0oPp2kxpZT456A&s"
            rating={4.5}
            onAdd={() => handleAddToCart({ name: "Chilli Panner", price: 120 })}
            count={itemCounts["Chilli Panner"] || 0}
            // reviews={10}
          />
        </MenuCategory>
        <MenuCategory id="Burgers" category="Burgers">
          <MenuItem
            name="Veg Burger"
            description="Vegetable burger with seasoned vegetables."
            price={40}
            imageUrl="https://www.vegrecipesofindia.com/wp-content/uploads/2020/12/burger-recipe-1.jpg"
            rating={4.5}
            onAdd={() =>
              handleAddToCart({
                name: "Veg Burger",
                price: 40,
              })
            }
            count={itemCounts["Veg Burger"] || 0}
            // reviews={10}
          />
          <MenuItem
            name="Chicken Burger"
            description="Chicken burger with a chicken patty."
            price={60}
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcRxEyjnsSJAnucLHmwo7VhnL919xLKP_IGA&s"
            rating={4.5}
            onAdd={() =>
              handleAddToCart({
                name: "Chicken Burger",
                price: 60,
              })
            }
            count={itemCounts["Chicken Burger"] || 0}
            // reviews={10}
          />
        </MenuCategory>
        <MenuCategory id="Combo Offers" category="Combo Offers">
          <MenuItem
            name="Egg Chowmin + Chilli Chicken"
            description="Noodles with spicy chicken."
            price={110}
            imageUrl="https://img-global.cpcdn.com/recipes/4f210b27b3128a88/400x400cq70/photo.jpg"
            rating={4.5}
            onAdd={() =>
              handleAddToCart({
                name: "Egg Chowmin + Chilli Chicken",
                price: 110,
              })
            }
            count={itemCounts["Egg Chowmin + Chilli Chicken"] || 0}
            // reviews={10}
          />
          <MenuItem
            name="Egg Chowmin + Chilli Panner"
            description="Noodles with spicy paneer."
            price={120}
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMTGkj4Ss3mazyS8OS35q51d6j4gN8woFUwCrOjD4iV75p13FR4g1CPr-OmDwihdOV_HM&usqp=CAU"
            rating={4.5}
            onAdd={() =>
              handleAddToCart({
                name: "Egg Chowmin + Chilli Panner",
                price: 120,
              })
            }
            count={itemCounts["Egg Chowmin + Chilli Panner"] || 0}
            // reviews={10}
          />
        </MenuCategory>
        <MenuCategory id="Hot & Cold" category="Hot & Cold">
          <MenuItem
            name="Masala Cold Drinks"
            description="Refreshing cold drink with a spicy twist."
            price={30}
            imageUrl="https://img.thecdn.in/323728/1695817497035_Masalacolddrinks.jpeg?width=260&height=260&format=webp"
            rating={4.5}
            onAdd={() =>
              handleAddToCart({ name: "Masala Cold Drinks", price: 30 })
            }
            count={itemCounts["Masala Cold Drinks"] || 0}
            // reviews={10}
          />
          <MenuItem
            name="Lassi"
            description="Creamy yogurt drink, lightly sweetened."
            price={40}
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Salt_lassi.jpg/800px-Salt_lassi.jpg"
            rating={4.5}
            onAdd={() => handleAddToCart({ name: "Lassi", price: 40 })}
            count={itemCounts["Lassi"] || 0}
            // reviews={10}
          />
        </MenuCategory>
        <div className="pb-10">
          <Cart
            id="cart"
            cartItems={cartItems}
            onRemoveItem={handleRemoveFromCart}
          />
          {cartItems.length !== 0 && (
            <button
              onClick={() => {
                const cartElement = document.getElementById("cart");
                if (cartElement) {
                  cartElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
                fireConfetti();
              }}
              className="fire-btn fixed z-40 bottom-8 left-8 text-white p-4 text-sm rounded-full shadow-lg transition-transform duration-300"
            >
              Order
            </button>
          )}
        </div>
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
