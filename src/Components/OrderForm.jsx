import { useState } from "react";

const OrderForm = ({ cartItems, onSubmit, isVisible, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    tableNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const orderDetails = {
      customerInfo: formData,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price, 0),
    };

    try {
      await onSubmit(orderDetails);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90%] max-h-[90%] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Complete Your Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              required
              // pattern="[0-9]{10}"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Table Number
            </label>
            <select
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.tableNumber}
              onChange={(e) =>
                setFormData({ ...formData, tableNumber: e.target.value })
              }
            >
              <option value="">Select Table</option>
              {[...Array(14)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Table {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
              <div className="border-t pt-2 font-bold">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>
                    ₹{cartItems.reduce((sum, item) => sum + item.price, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 text-white rounded-md text-sm disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gradient-to-br from-[#723FCD] to-[#DB9FF5] text-white rounded-md text-sm disabled:opacity-50 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Waiting For Approval...
                </>
              ) : (
                "Confirm Order"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default OrderForm;
