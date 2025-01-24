import { useState } from "react";
import toast from "react-hot-toast";

const WaiterCallForm = ({ isVisible, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tableNumber, setTableNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure table is selected
    if (!tableNumber) {
      toast.error("Please select a table number");
      return;
    }

    setIsSubmitting(true);
    const callingToast = toast.loading("Calling waiter...");

    try {
      const response = await fetch("/api/call-waiter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableNumber,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit waiter call");
      }

      toast.success("Waiter on the way!", { id: callingToast });
      onClose();
    } catch (error) {
      toast.error("Failed to call waiter", { id: callingToast });
      console.error("Error calling waiter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90%]">
        <h2 className="text-xl font-bold mb-4">Call A Waiter</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Table Number
            </label>
            <select
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="">Select Table</option>
              {[...Array(14)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Table {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
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
                  Calling...
                </>
              ) : (
                "Call Waiter"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WaiterCallForm;
