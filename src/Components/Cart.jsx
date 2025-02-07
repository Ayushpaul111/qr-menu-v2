import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Cart({ items = [], onIncrement, onDecrement }) {
  const [isMinimized, setIsMinimized] = useState(false);

  // Calculate total price using the quantity from each item
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Create an object to store unique items with their quantities
  const cartItems = items.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = {
        ...item,
        quantity: item.quantity,
      };
    }
    return acc;
  }, {});

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-30"
    >
      <div className="relative">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="absolute -top-8 right-4 bg-orange-500 text-white p-2 rounded-t-lg"
        >
          {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white transition-all duration-300 mb-12">
              <h2 className="text-lg font-semibold mb-4">Cart Items</h2>
              <div>
                <ul className="space-y-2">
                  {Object.values(cartItems).map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center py-2"
                    >
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <div className="text-sm text-gray-600">
                          x{item.quantity} = ₹{item.price * item.quantity}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onDecrement(item)}
                          className="text-red-600 bg-red-100 w-8 h-8 rounded-full flex items-center justify-center"
                        >
                          -
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          onClick={() => onIncrement(item)}
                          className="text-green-600 bg-green-100 w-8 h-8 rounded-full flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <strong>Total:</strong>
                    <span className="text-lg font-semibold">₹{totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMinimized && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-medium">Cart Total:</span>
            <span className="text-lg font-semibold">₹{totalPrice}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
