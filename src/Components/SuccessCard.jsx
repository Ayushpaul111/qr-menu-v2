import { motion } from "framer-motion";

const SuccessCard = ({ orderDetails, onClose }) => {
  if (!orderDetails) return null;

  const formatDate = () => {
    const orderDate = new Date();
    return orderDate.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const calculateTotal = () => {
    if (!orderDetails.items) return 0;
    return orderDetails.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  return (
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
        className="bg-white rounded-lg w-80 max-w-[90%] max-h-[90%] overflow-y-auto shadow-xl relative"
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-center flex-1">
            <h1 className="text-lg font-medium">Your Order</h1>
          </div>
          {/* <div className="w-5"></div> Empty div for balance */}
        </div>

        {/* Receipt content */}
        <div className="px-6 py-4">
          {/* Restaurant logo and info */}
          <div className="text-center mb-6">
            <div className="mx-auto mb-2">
              <a
                href="https://ehike.in"
                className="text-xl bg-clip-text text-transparent bg-gradient-to-br from-[#723FCD] to-[#DB9FF5] font-bold italic min-w-fit"
              >
                Ehike
              </a>
            </div>
            <h2 className="font-bold text-lg">Ehike Restaurant</h2>
            <p className="text-sm text-gray-500">{formatDate()}</p>
          </div>

          {/* Total payment */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Total Payment</h3>
              <span className="text-lg font-bold">₹{calculateTotal()}</span>
            </div>

            {/* Order items */}
            <div className="space-y-2">
              {orderDetails.items &&
                orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <span>{item.name}</span>
                      <span className="text-gray-500 ml-2">
                        x {item.quantity}
                      </span>
                    </div>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Customer info */}
          <div className="border-t border-dashed pt-4 mb-4">
            <div className="text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-500">Table</span>
                <span>{orderDetails.customerInfo?.tableNumber}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500">Customer</span>
                <span>{orderDetails.customerInfo?.name}</span>
              </div>
              {orderDetails.customerInfo?.phone && (
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">Phone</span>
                  <span>{orderDetails.customerInfo?.phone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method</span>
                <span>Cash</span>
              </div>
            </div>
          </div>
          <div className="border-t border-dashed pt-1"></div>
          {/* Barcode */}
          <div className="text-center mb-4">
            <p className="text-sm font-medium mt-2">
              Your Meal Is Currently Being Prepared!
            </p>
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGRsOXd1ZWplMWlpMmFicWs5eWMxNHh2MzBnNWxhb3I2djd4NGg1ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/J6axDheV6g0YzrZuzR/giphy.gif"
              alt="Empty plate"
              className="mx-auto h-12 "
            />
          </div>
        </div>

        {/* Footer button */}
        <div className="flex space-x-4 m-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            Cancel
          </motion.button>
          <motion.a
            href="tel:+919064995568"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-3 bg-gradient-to-br from-purple-600 to-purple-400 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
          >
            Call
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessCard;
