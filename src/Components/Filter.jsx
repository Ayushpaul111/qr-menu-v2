import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Filter = ({
  options,
  selectedValue,
  onChange,
  includeAllOption = true,
  allOptionLabel = "All",
  extraButtons = [],
}) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 350);
    }
  };

  useEffect(() => {
    checkScroll();
    const resizeObserver = new ResizeObserver(() => checkScroll());
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
      scrollContainerRef.current.addEventListener("scroll", checkScroll);
    }
    return () => {
      if (scrollContainerRef.current) {
        resizeObserver.unobserve(scrollContainerRef.current);
        scrollContainerRef.current.removeEventListener("scroll", checkScroll);
      }
      resizeObserver.disconnect();
    };
  }, [options, extraButtons]);

  return (
    <div className="relative w-full">
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md p-1 flex items-center justify-center"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="overflow-x-auto w-full hide-scrollbar" // Changed to custom class
        onScroll={checkScroll}
      >
        <div className="flex gap-2 pb-2 px-6 min-w-max">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`px-4 transition-all duration-200 sm:px-6 py-2 sm:py-3 rounded-lg border flex-shrink-0 text-sm sm:text-base ${
                selectedValue === option.value
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/30 transform -translate-y-0.5"
                  : "bg-white text-gray-600 hover:bg-orange-50"
              }`}
            >
              {option.label}
            </button>
          ))}

          {includeAllOption && (
            <button
              onClick={() => onChange(null)}
              className={`px-4 transition-all duration-200 sm:px-6 py-2 sm:py-3 rounded-lg border flex-shrink-0 text-sm sm:text-base ${
                selectedValue === null
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/30 transform -translate-y-0.5"
                  : "bg-white text-gray-600 hover:bg-orange-50"
              }`}
            >
              {allOptionLabel}
            </button>
          )}

          {extraButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg border ${
                button.className || "bg-green-600 text-white border-gray-200"
              } flex-shrink-0 text-sm sm:text-base`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md p-1 flex items-center justify-center"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default Filter;
