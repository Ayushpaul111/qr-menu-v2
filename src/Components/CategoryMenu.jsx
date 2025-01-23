"use client";
import { useState } from "react";

const CategoryMenu = ({ categories }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the menu visibility

  const handleScrollToCategory = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false); // Close the menu after selecting a category
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleMenu}
        className="fixed z-50 bottom-8 right-8 bg-blue-500 text-white p-4 text-sm rounded-full shadow-lg hover:bg-blue-600 transition-transform duration-300"
      >
        {/* You can add an icon like a hamburger icon here */}
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        ) : (
          "Main Menu"
        )}
      </button>

      {/* Conditional rendering of the category menu */}
      <div
        className={`fixed z-50 bottom-24 right-8 bg-white shadow-lg p-4 rounded-lg z-10 transform transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <ul className="max-w-md divide-y divide-gray-200 ">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => handleScrollToCategory(category.id)}
                className="block w-full justify-center text-center px-4 py-2 hover:bg-gray-300 text-sm button-custom"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoryMenu;
