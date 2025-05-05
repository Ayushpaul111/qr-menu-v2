import { Star, Coffee, Clock10 } from "lucide-react";
// import Img from "../assets/fest.jpg";
import Image from "next/image";

const RestaurantHeaderDark = () => {
  return (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden">
      <div className="h-80 w-full overflow-hidden relative">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-s3aCvXBgTIpD8qvHq-dcrBDbWzKNj_skog&s"
          alt="Bonbhojon Restaurant"
          className=" h-full w-full object-cover object-left opacity-100"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div> */}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="backdrop-blur-md bg-gray-900/10 rounded-2xl p-6 border border-gray-500/10">
          <div className="flex justify-between md:items-start items-center">
            <div>
              <div className="flex gap-2 mb-3"></div>

              <h1 className="text-3xl font-bold text-white mb-2">
                Ehike Restaurant
              </h1>

              <div className="flex flex-wrap gap-4 text-gray-300">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400 mr-1.5" />
                  <span className="font-medium">4.5</span>
                  {/* <span className="text-gray-500 ml-1">(324)</span> */}
                </div>
                <div className="flex items-center">
                  <Coffee className="w-5 h-5 mr-1.5 text-purple-600" />
                  <span className="font-medium">Cafe</span>
                </div>
                <div className="flex items-center">
                  <Clock10 className="w-5 h-5 text-emerald-400 mr-1.5" />
                  <span className="font-medium">5-10 mins</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2"></div>
          </div>

          <div className="flex gap-3 mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeaderDark;
