import { useEffect } from "react";

export function useClickOutside(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      // If ref is not set or click is inside the element, do nothing
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    }

    // Listen for both mouse and touch events
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup listeners on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler]);
}