import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";

export default function Cart({ items = [], onIncrement, onDecrement }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const cartRef = useRef(null);

  // Calculate totals
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Handle clicks outside the cart
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-24 left-0 right-0 mx-auto w-full max-w-md px-4"
      ref={cartRef}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        {/* Cart Header */}
        <div
          className="p-4 flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">Your Cart</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{totalItems} items</span>
            <span className="font-semibold text-gray-900">₹{total}</span>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>

        {/* Cart Items */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">₹{item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDecrement(item);
                        }}
                        className="p-1 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium text-gray-700 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onIncrement(item);
                        }}
                        className="p-1 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <strong className="text-gray-900">Total Amount</strong>
                    <span className="text-lg font-semibold text-gray-900">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
