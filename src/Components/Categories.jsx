import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full justify-center py-2 mb-2 text-sm font-medium text-gray-800 hover:text-gray-900 bg-white"
      >
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
        Categories
      </button>

      <div
        className={`
        overflow-hidden transition-all duration-300
        ${isExpanded ? "max-h-[400px]" : "max-h-0"}
      `}
      >
        <div className="px-1">
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:space-x-3 sm:gap-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-3 py-2 sm:px-6 sm:py-3 
                  rounded-xl
                  transition-all duration-200 
                  text-center
                  sm:flex-shrink-0
                  text-xs sm:text-sm font-medium
                  ${
                    selectedCategory === category
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 transform -translate-y-0.5"
                      : "bg-white text-gray-600 hover:bg-orange-50"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
