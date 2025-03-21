"use client";
import { useState, useRef, useEffect } from "react";
import { Search, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SelectedFilters from "./SelectedFilters";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  filteredItems,
  selectedCategory,
  filterVeg,
  onClearCategory,
  onClearVeg,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const searchRef = useRef(null);
  const searchWrapperRef = useRef(null);
  const lastScrollY = useRef(0);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle sticky behavior on scroll and close results on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle sticky behavior
      if (searchWrapperRef.current) {
        const rect = searchWrapperRef.current.getBoundingClientRect();
        const shouldBeSticky = rect.top <= 2;
        setIsSticky(shouldBeSticky);
      }

      // Close results when scrolling down (regardless of device type)
      // This is the key change - we're removing the isMobile condition to make it work like the Cart
      if (showResults) {
        const isScrollingDown = currentScrollY > lastScrollY.current;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

        // If scrolling down by more than 5px, close the results
        // Reduced from 15px to 5px to make it more responsive
        if (isScrollingDown && scrollDelta > 5) {
          setShowResults(false);
          // Also unfocus the search input when scrolling
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showResults]); // Only depend on showResults

  const handleClear = () => {
    setSearchTerm("");
    setShowResults(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (searchTerm) setShowResults(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  // Quick results preview - show up to 3 matches
  const previewResults = filteredItems.slice(0, 3);

  return (
    <div ref={searchWrapperRef} className="w-full">
      <motion.div
        className={`${
          isSticky
            ? "fixed top-4 left-0 right-0 z-40 px-10 py-3 bg-transparent"
            : ""
        }`}
        animate={isSticky ? { y: ["-10%", "0%"] } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative w-full" ref={searchRef}>
          {/* Expanded search bar when focused */}
          <motion.div
            animate={{
              scale: isFocused ? 1.02 : 1,
              boxShadow: isFocused
                ? "0 4px 14px rgba(0, 0, 0, 0.1)"
                : "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative flex items-center rounded-lg bg-white overflow-hidden">
              <AnimatePresence mode="wait">
                {showResults ? (
                  <motion.button
                    key="back-button"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setShowResults(false)}
                    className="absolute left-3 flex items-center justify-center text-gray-500 hover:text-gray-700 bg-transparent"
                  >
                    <ArrowLeft size={18} />
                  </motion.button>
                ) : (
                  <motion.div
                    key="search-icon"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-3 text-gray-400"
                  >
                    <Search size={18} />
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                type="text"
                placeholder="Search for dishes, ingredients..."
                className={`w-full py-3.5 border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base bg-white ${
                  isFocused && showResults ? "pl-10" : "pl-10"
                } pr-12 rounded-lg`}
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleFocus}
                onBlur={() => setIsFocused(false)}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                autoCapitalize="off"
              />

              <AnimatePresence>
                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    onClick={handleClear}
                    className="absolute right-3 flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <SelectedFilters
            selectedCategory={selectedCategory}
            filterVeg={filterVeg}
            onClearCategory={onClearCategory}
            onClearVeg={onClearVeg}
            isVisible={isSticky}
          />

          {/* Search results dropdown */}
          <AnimatePresence>
            {showResults && searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
              >
                {previewResults.length > 0 ? (
                  <div>
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm text-gray-500">
                        Showing {previewResults.length} of{" "}
                        {filteredItems.length} items
                      </p>
                    </div>

                    <ul>
                      {previewResults.map((item, index) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            // You could implement scrolling to this item or another action
                            setShowResults(false);
                          }}
                        >
                          <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500 truncate">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full mr-1 ${
                                item.isVeg ? "bg-green-500" : "bg-red-500"
                              }`}
                            ></div>
                            <span className="text-gray-700 font-medium">
                              ₹{item.price}
                            </span>
                          </div>
                        </motion.li>
                      ))}
                    </ul>

                    {filteredItems.length > 5 && (
                      <div className="p-3 text-center border-t border-gray-100">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="text-orange-500 font-medium text-sm bg-transparent hover:text-orange-600"
                          onClick={() => setShowResults(false)}
                        >
                          See all {filteredItems.length} items
                        </motion.button>
                      </div>
                    )}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 text-center"
                  >
                    <p className="text-gray-500">
                      No dishes found matching &quot;{searchTerm}&quot;
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try something else or browse our categories
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      {/* Add a spacer div that takes up space when the search bar becomes fixed */}
      {isSticky && <div className="h-20"></div>}
    </div>
  );
};

export default SearchBar;
