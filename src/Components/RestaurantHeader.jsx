import { Star, Coffee, Clock } from "lucide-react";

const RestaurantHeader = () => {
  return (
    <div className="relative z-40">
      <div className="h-60 w-full overflow-hidden rounded-b-3xl">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-s3aCvXBgTIpD8qvHq-dcrBDbWzKNj_skog&s"
          alt="Ehike Restaurant"
          className="w-full h-full object-cover brightness-75"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
        <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-5 border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-3xl font-extrabold text-gray-800">
              Ehike Restaurant
            </h1>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">4.5</span>
              <Coffee className="w-5 h-5 ml-3 text-purple-600" />
              <span>Cafe</span>
            </div>
            <div className="flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              <Clock className="w-4 h-4 mr-2" />
              5-10 mins
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
