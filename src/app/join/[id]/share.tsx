"use client"; // Directive indicating this component runs on the client-side

import React from "react";
import { FiShare } from "react-icons/fi";
import { toast, Toaster } from "sonner";

/**
 * A button component that copies the current page's URL to the clipboard
 * when clicked and displays an alert confirmation.
 */
const ShareButton = () => {
  const handleShareClick = () => {
    // Check if navigator.clipboard is available (supported in secure contexts like HTTPS)
    if (navigator.clipboard && window.location) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          // Success feedback
          toast("Challenge invite copied to clipboard!");
        })
        .catch(() => {
          toast.error(
            "Failed to copy link. Please try again or copy manually."
          );
        });
    } else {
      toast.error("Clipboard API not available in this browser or context.");
      console.warn("navigator.clipboard API not available.");
    }
  };

  return (
    <button
      onClick={handleShareClick}
      // Apply Tailwind CSS classes for styling
      // Make sure these classes (text-secondary-light, hover:text-[#A093E8])
      // are defined in your Tailwind configuration or global CSS.
      className="flex items-center gap-2 text-secondary-light hover:text-[#A093E8] px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm "
      aria-label="Copy page link to clipboard" // Accessibility improvement
    >
      <FiShare className="w-4 h-4" />
      <div>Share</div>
    </button>
  );
};

export default ShareButton;
