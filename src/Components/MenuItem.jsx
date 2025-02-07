import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MenuItem = ({
  id,
  name,
  description,
  price,
  image,
  rating,
  isVeg,
  count,
  onIncrement,
  onDecrement,
}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [shouldRender, setShouldRender] = useState(false);

  // useEffect(() => {
  //   if (isModalOpen) {
  //     setShouldRender(true);
  //   } else {
  //     const timer = setTimeout(() => {
  //       setShouldRender(false);
  //     }, 300);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isModalOpen]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full"
    >
      <div className="relative h-40 sm:h-48">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div
          className={`absolute top-2 right-2 ${
            isVeg ? "bg-green-500" : "bg-red-500"
          } text-white px-2 py-1 rounded-full text-xs`}
        >
          {isVeg ? "Veg" : "Non-veg"}
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center bg-orange-100 px-2 py-1 rounded ml-2 flex-shrink-0">
            <span className="text-orange-500">★</span>
            <span className="ml-1 text-sm">{rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-base sm:text-lg font-bold text-gray-800">
            ₹{price}
          </span>
          <div className="flex items-center space-x-2">
            {count === 0 ? (
              <button
                onClick={onIncrement}
                className="bg-green-500 text-white px-3 sm:px-4 py-1 rounded-full hover:bg-green-600 transition-colors text-sm sm:text-base"
              >
                Add
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onDecrement}
                  className="text-red-600 bg-red-100 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-4 text-center">{count}</span>
                <button
                  onClick={onIncrement}
                  className="text-green-600 bg-green-100 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItem;
