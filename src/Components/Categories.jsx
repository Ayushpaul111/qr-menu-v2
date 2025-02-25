import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
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
  }, [categories]);

  return (
    <div className="mb-6 relative w-full">
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
        className="overflow-x-auto w-full hide-scrollbar" // Changed class name
        onScroll={checkScroll}
      >
        <div className="flex space-x-3 min-w-max px-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 sm:px-6 sm:py-3 
                rounded-xl
                transition-all duration-200 
                text-center
                flex-shrink-0
                text-xs sm:text-sm font-medium
                ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/30 transform -translate-x-0.5"
                    : "bg-white text-gray-600 hover:bg-orange-50"
                }
              `}
            >
              {category}
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

export default Categories;
