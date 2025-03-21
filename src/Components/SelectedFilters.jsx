import React from "react";
import { X } from "lucide-react";

const SelectedFilters = ({
  selectedCategory,
  filterVeg,
  onClearCategory,
  onClearVeg,
  isVisible,
}) => {
  if (!isVisible) return null;

  const hasActiveFilters = selectedCategory !== "All" || filterVeg !== null;

  if (!hasActiveFilters) return null;

  return (
    <div className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 py-2 px-4 transition-all duration-300 flex items-center overflow-x-auto hide-scrollbar rounded rounded-b-xl">
      <div className="flex gap-1 items-center flex-wrap">
        <span className="text-xs text-gray-500">Showing:</span>

        {selectedCategory !== "All" && (
          <div className="flex items-center gap-1 bg-green-100 text-green-700 rounded-b-xl py-1 px-3 text-xs">
            <span>{selectedCategory}</span>
            <button
              onClick={onClearCategory}
              className="ml-1 bg-green-200 rounded-b-xl p-0.5 bg-transparent"
              aria-label="Clear category filter"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {filterVeg !== null && (
          <div className="flex items-center gap-1 bg-orange-100 text-red-700 rounded-full py-1 px-3 text-xs">
            <span>{filterVeg ? "Veg" : "Non-veg"}</span>
            <button
              onClick={onClearVeg}
              className="ml-1 bg-orange-200  rounded-full p-0.5 bg-transparent"
              aria-label="Clear veg/non-veg filter"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedFilters;
