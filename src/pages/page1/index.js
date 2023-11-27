// Import the React library
import React from "react";
// Import the useNavigate hook from react-router-dom for programmatic navigation
import { useNavigate } from "react-router-dom";

// Define the PageOne functional component
function PageOne() {
  // Initialize the navigation function using the useNavigate hook
  const navigation = useNavigate();

  // Render the JSX for the PageOne component
  return (
    // Container div with flexbox centering and full height and width (h-screen/w-screen)
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      {/* Title for the page */}
      <h1 className="text-4xl">This is the first page.</h1>
      {/* Navigation button to go back to the Main Page */}
      <button
        // Styling for the button with margin-top, padding, rounded borders, border color, hover effect, and transition properties
        className="mt-4 px-4 py-2 rounded-full border border-[#ddd] hover:bg-[#ddd] transition-all duration-300"
        // OnClick event handler to navigate back to the root route ("/") when the button is clicked
        onClick={() => navigation("/")}
      >
        Back to Main Page.
      </button>
    </div>
  );
}

// Export the PageOne component as the default export
export default PageOne;

