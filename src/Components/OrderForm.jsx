import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const OrderForm = ({ cartItems, onSubmit, isVisible, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    tableNumber: "",
  });

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const itemsWithDetails = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity,
    }));

    const orderDetails = {
      customerInfo: formData,
      items: itemsWithDetails,
      total: calculateTotal(cartItems),
      orderDate: new Date().toISOString(),
    };

    try {
      await onSubmit(orderDetails);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white rounded-2xl p-8 w-96 max-w-[90%] max-h-[90%] overflow-y-auto shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Complete Your Order
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {["name", "phone", "tableNumber"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    {field === "name"
                      ? "Name"
                      : field === "phone"
                      ? "Phone Number"
                      : "Table Number"}
                  </label>
                  {field === "tableNumber" ? (
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                    >
                      <option value="">Select Table</option>
                      {[...Array(14)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          Table {i + 1}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field === "phone" ? "tel" : "text"}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                    />
                  )}
                </div>
              ))}

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3 text-gray-700">
                  Order Summary
                </h3>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm py-1"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{calculateTotal(cartItems)}</span>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 border border-gray-300 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-gradient-to-br from-purple-600 to-purple-400 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Confirm Order"
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderForm;
