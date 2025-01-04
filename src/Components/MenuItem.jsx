const MenuItem = ({
  name,
  description,
  price,
  imageUrl,
  rating,
  count,
  onAdd,
}) => {
  return (
    <div className="flex justify-between items-start p-4 bg-white rounded-lg my-2 shadow-md">
      {/* Left Section with Item Details */}
      <div className="w-2/3">
        {/* Vegetarian/Non-vegetarian Icon */}
        <div className="flex items-center mb-2">
          {/* <span className="inline-block w-3 h-3 border-2 border-green-500 rounded-full mr-2"></span> */}
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>

        <p className="text-gray-600 mb-2">₹{price}</p>

        <div className="flex items-center mb-2">
          <span className="text-green-600 text-sm font-medium mr-1">
            {rating}
          </span>
          <span className="text-sm text-gray-600">⭐</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500">
          {description.length > 60
            ? `${description.substring(0, 50)} ...more`
            : description}
        </p>
      </div>

      {/* Right Section with Image and Add Button */}
      <div className="flex flex-col items-center">
        {/* Item Image */}
        <img
          src={imageUrl}
          alt={name}
          className="w-24 h-24 object-cover rounded-lg mb-2"
        />

        <button onClick={onAdd}>
          <span className="button_top">
            {" "}
            {count > 0 ? `(${count}) Added` : "Add"}{" "}
          </span>
        </button>

        {/* Customizable Text */}
        {/* <p className="text-xs text-gray-500 mt-1">Customisable</p> */}
      </div>
    </div>
  );
};

export default MenuItem;
