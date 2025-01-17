import { Check } from "lucide-react";

const SuccessCard = ({ orderDetails, onClose }) => {
  if (!orderDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-3xl relative pb-8 p-6 w-96 max-w-[90%]">
        {/* Top Circle with Check Icon */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="bg-gray-900 rounded-full p-4">
            <div className="bg-emerald-500 rounded-full p-4">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 px-6 text-center">
          <h1 className="text-white text-3xl font-bold mb-2">Order Success!</h1>
          <p className="text-gray-400 text-lg mb-8">
            Your order has been successfully placed.
          </p>

          <div className="border-t border-gray-700 my-6"></div>

          {/* Total Payment */}
          <div className="mb-8">
            <p className="text-gray-400 mb-2">Total Payment</p>
            <p className="text-white text-4xl font-bold">
              ₹{orderDetails.total}
            </p>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8 text-left">
            <div className=" border border-gray-700 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Table Number</p>
              <p className="text-white font-medium">
                {orderDetails.customerInfo.tableNumber}
              </p>
            </div>
            <div className="border border-gray-700 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Customer Name</p>
              <p className="text-white font-medium">
                {orderDetails.customerInfo.name}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="bg-gradient-to-br from-[#723FCD] to-[#DB9FF5] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>

        {/* Bottom Decorative Border */}
        <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden">
          <div className="flex justify-between px-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-800 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;
