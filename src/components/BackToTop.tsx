"use client";
import Button from "@/components/Button";
import { FaChevronUp } from "react-icons/fa";

interface BackToTopProps {
  className?: string;
}

export default function BackToTop({ className = "" }: BackToTopProps) {
  const scrollToTop = () => {
    console.log("BackToTop clicked"); // Debug log

    // Function to find the scrollable element
    const findScrollableParent = () => {
      // Check common scrollable containers
      const possibleContainers = [
        document.documentElement,
        document.body,
        document.querySelector("main"),
        document.querySelector('[role="main"]'),
        document.querySelector(".page-content"),
        document.querySelector("#__next"), // Next.js app container
      ].filter(Boolean);

      for (const container of possibleContainers) {
        if (container && container.scrollTop > 0) {
          return container;
        }
      }

      // If nothing is currently scrolled, return the first scrollable element
      return document.documentElement;
    };

    try {
      const scrollContainer = findScrollableParent();
      console.log("Scrolling element:", scrollContainer); // Debug log

      // Try multiple scroll methods
      // Method 1: Smooth scroll
      if (scrollContainer.scrollTo) {
        scrollContainer.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Method 2: Window scroll (for body/html)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Method 3: Direct property setting as fallback
      setTimeout(() => {
        scrollContainer.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.pageYOffset = 0;
      }, 100);
    } catch (error) {
      console.error("Error scrolling to top:", error);
      // Emergency fallback
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  return (
    <div className={`flex justify-end mt-6 mb-8 ${className}`}>
      <Button
        onClick={scrollToTop}
        variant={"tertiary"}
        className="group"
        aria-label="Back to top"
      >
        <FaChevronUp className="duration-300 ease-linear group-hover:-translate-y-1" />
        Back to Top
      </Button>
    </div>
  );
}
