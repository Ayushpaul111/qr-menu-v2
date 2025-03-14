import React, { useState, useRef, useEffect } from "react";

const SwipeToOrder = ({ onOrderComplete, isOrderFormOpen = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const [completed, setCompleted] = useState(false);
  const sliderRef = useRef(null);
  const thumbRef = useRef(null);
  const maxPosition = useRef(0);

  // Threshold for considering the slide complete (90% of max)
  const completionThreshold = 0.9;
  // Padding on each side
  const padding = 8;

  // Reset when order form is closed
  useEffect(() => {
    if (!isOrderFormOpen && completed) {
      setCompleted(false);
      setPosition(0);
    }
  }, [isOrderFormOpen]);

  // Calculate max position with padding
  const calculateMaxPosition = () => {
    if (sliderRef.current && thumbRef.current) {
      return (
        sliderRef.current.clientWidth -
        thumbRef.current.clientWidth -
        padding * 2
      );
    }
    return 0;
  };

  useEffect(() => {
    maxPosition.current = calculateMaxPosition();

    // Handle window resize
    const handleResize = () => {
      const newMaxPosition = calculateMaxPosition();
      maxPosition.current = newMaxPosition;

      // If already completed, ensure thumb stays at the end
      if (completed) {
        setPosition(newMaxPosition);
      } else if (position > newMaxPosition) {
        // If current position exceeds new max (e.g. after window resize)
        setPosition(newMaxPosition);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [completed, position]);

  const handleTouchStart = (e) => {
    if (completed) return;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || completed) return;

    const touch = e.touches[0];
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const newPosition = Math.max(
      0,
      Math.min(
        touch.clientX - sliderRect.left - thumbRef.current.clientWidth / 2,
        maxPosition.current
      )
    );

    setPosition(newPosition);

    // Check if slider is completed
    if (newPosition >= maxPosition.current * completionThreshold) {
      completeOrder();
    }
  };

  const handleTouchEnd = () => {
    if (completed) return;

    if (isDragging) {
      setIsDragging(false);
      // Reset only if not completed
      if (position < maxPosition.current * completionThreshold) {
        setPosition(0);
      }
    }
  };

  // Mouse events for desktop
  const handleMouseDown = (e) => {
    if (completed) return;
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || completed) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const newPosition = Math.max(
      0,
      Math.min(
        e.clientX - sliderRect.left - thumbRef.current.clientWidth / 2,
        maxPosition.current
      )
    );

    setPosition(newPosition);

    // Check if slider is completed
    if (newPosition >= maxPosition.current * completionThreshold) {
      completeOrder();
    }
  };

  const handleMouseUp = () => {
    handleTouchEnd();
  };

  useEffect(() => {
    // Add global mouse event listeners
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const completeOrder = () => {
    if (completed) return;

    setCompleted(true);
    setPosition(maxPosition.current);
    setIsDragging(false);

    // Trigger the callback
    setTimeout(() => {
      onOrderComplete && onOrderComplete();
    }, 300);
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 w-64 sm:w-80">
      <div
        ref={sliderRef}
        className={`rounded-full h-12 sm:h-14 relative overflow-hidden shadow-lg ${
          completed ? "bg-green-600" : "bg-green-500"
        }`}
      >
        {/* Track with non-selectable text */}
        <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
          {completed ? "Confirm Order!" : "Slide to Order"}
        </div>

        {/* Container for the thumb with padding */}
        <div className="absolute inset-0 px-2">
          {/* Thumb */}
          <div
            ref={thumbRef}
            className={`absolute top-1 h-10 sm:h-12 aspect-square bg-white rounded-full flex items-center justify-center shadow-md transition-transform ${
              completed ? "cursor-default" : "cursor-grab"
            }`}
            style={{
              transform: `translateX(${position}px)`,
              touchAction: "none",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            {completed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeToOrder;
