const Cart = ({ cartItems, onRemoveItem, id }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  return (
    <div
      id={id}
      className="p-4 bg-white rounded-lg shadow-lg mt-4 transition-all duration-300"
    >
      <h2 className="text-lg font-semibold">Added Items</h2>

      {cartItems.length === 0 ? (
        <p>Add items to order.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2"
              >
                <div>
                  <span>{item.name}</span> - <span>₹{item.price}</span>
                </div>
                <button
                  onClick={() => onRemoveItem(index)}
                  className="text-slate-800 text-sm bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </span>
                  <span className="hidden md:inline-block">Remove</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="text-left mt-4 ">
            <hr />
            <div className="py-2">
              <strong>Total:</strong> ₹{totalPrice}
            </div>
          </div>
        </div>
      )}
      <hr />
      <div className="mt-4 flex justify-center text-center">
        <h2>
          Select items and call someone to show them the order and confirm it.
        </h2>
      </div>
    </div>
  );
};

export default Cart;
