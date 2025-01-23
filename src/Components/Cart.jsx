const Cart = ({ cartItems, onIncrement, onDecrement, id }) => {
  // Create an object to track item frequencies
  const itemFrequency = cartItems.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1;
    return acc;
  }, {});

  // Calculate total price using unique items and their frequencies
  const totalPrice = Object.entries(itemFrequency).reduce(
    (total, [name, count]) => {
      const itemPrice = cartItems.find((item) => item.name === name).price;
      return total + itemPrice * count;
    },
    0
  );

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
            {Object.entries(itemFrequency).map(([name, count]) => {
              const item = cartItems.find((i) => i.name === name);
              return (
                <li
                  key={name}
                  className="flex justify-between items-center py-2"
                >
                  <div>
                    <span>{name}</span> x {count} -{" "}
                    <span>₹{item.price * count}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onDecrement(item)}
                      className="text-red-600 bg-red-100 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <button
                      onClick={() => onIncrement(item)}
                      className="text-green-600 bg-green-100 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
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
    </div>
  );
};

export default Cart;
