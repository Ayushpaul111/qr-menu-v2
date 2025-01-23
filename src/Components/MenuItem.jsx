import React, { useState, useEffect, useRef } from "react";

const MenuItem = ({
  name,
  description,
  price,
  imageUrl,
  rating,
  count,
  onIncrement,
  onDecrement,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      toggleModal();
    }
  };

  return (
    <>
      {/* Regular Card View */}
      <div className="flex justify-between items-start p-4 bg-white rounded-lg my-2 shadow-md">
        <div className="w-2/3">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold">{name}</h3>
          </div>
          <p className="text-gray-600 mb-2">₹{price}</p>
          <div className="flex items-center mb-2">
            <span className="text-green-600 text-sm font-medium mr-1">
              {rating}
            </span>
            <span className="text-sm text-green-800 font-semibold">
              {typeof rating === "number" ? `⭐` : `pc`}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {description.length > 60
              ? `${description.substring(0, 50)} ...more`
              : description}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={imageUrl}
            alt={name}
            className="w-24 h-24 object-cover rounded-lg mb-2 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={toggleModal}
          />
          <div className="flex items-center space-x-2">
            {count === 0 && (
              <button onClick={onIncrement}>
                <span className="button_top">
                  {count > 0 ? `(${count})` : "Add"}
                </span>
              </button>
            )}
            {count > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onDecrement}
                  className="text-red-600 bg-red-100 px-2 py-1 rounded"
                >
                  -
                </button>
                <span>{count}</span>
                <button
                  onClick={onIncrement}
                  className="text-green-600 bg-green-100 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal View */}
      {shouldRender && (
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out flex items-center justify-center z-50
            ${
              isModalOpen
                ? "bg-opacity-50 opacity-100"
                : "bg-opacity-0 opacity-0"
            }`}
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className={`z-50 bg-white rounded-lg max-w-2xl w-full mx-4 relative transform transition-all duration-300 ease-in-out
              ${isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          >
            <div className="p-6">
              {/* <button
                onClick={toggleModal}
                className="absolute right-4 top-4 text-black hover:opacity-80 transition-opacity"
              >
                <X size={24} />
              </button> */}
              <div className="gap-6 mb-4">
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-48 object-fill rounded-md border-b border-gray-200 pb-2"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2 mt-1npm urn dev">
                    {name}
                  </h3>
                  <p className="text-gray-600 text-lg mb-2">₹{price}</p>
                  <div className="flex items-center mb-2">
                    <span className="text-green-600 text-sm font-medium mr-1">
                      {rating}
                    </span>
                    <span className="text-sm text-green-800 font-semibold">
                      {typeof rating === "number" ? `⭐` : `pc`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-600">{description}</p>
              </div>

              {/* Stats Section */}
              <div className="text-center border-t pt-4 flex justify-between px-8">
                <button onClick={toggleModal}>
                  <span className="button_top">Close</span>
                </button>
                <div className="flex items-center space-x-2">
                  {count === 0 && (
                    <button onClick={onIncrement}>
                      <span className="button_top">
                        {count > 0 ? `(${count})` : "Add"}
                      </span>
                    </button>
                  )}
                  {count > 0 && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={onDecrement}
                        className="text-red-600 bg-red-100 px-2 py-1 rounded"
                      >
                        -
                      </button>
                      <span>{count}</span>
                      <button
                        onClick={onIncrement}
                        className="text-green-600 bg-green-100 px-2 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItem;
