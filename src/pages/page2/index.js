import React from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom for navigation.

// Functional component definition for PageTwo.
function PageTwo() {
  const navigation = useNavigate(); // Hook to get navigation function to navigate programmatically.

  // Component render.
  return (
    // Container div with flexbox styling to center content vertically and horizontally.
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      {/* Heading indicating this is the second page. */}
      <h1 className="text-4xl">This is the second page.</h1>
      {/* Navigation button */}
      <button
        // TailwindCSS classes for styling the button.
        className="mt-4 px-4 py-2 rounded-full border border-[#ddd] hover:bg-[#ddd] transition-all duration-300"
        // Event handler for button click using the navigation function to redirect to the main page ('/').
        onClick={() => navigation("/")}
      >
        Back to Main Page. {/* Button text */}
      </button>
    </div>
  );
}

export default PageTwo; // Exporting PageTwo component to be used in other parts of the app.

