// Import the useState hook from the React library
import { useState } from "react";
// Import the AnimatedGradientBackground component from a relative path
import AnimatedGradientBackground from "../../components/AnimatedGradientBackground";
// Import the useNavigate hook from react-router-dom for programmatic navigation
import { useNavigate } from "react-router-dom";
// Import classnames utility to conditionally join class names together
import * as cn from "classnames";

// Define the MainPage functional component
function MainPage() {
  // State variable for storing the input password
  const [password, setPassword] = useState("");
  // State variable for managing the active state of the submit button
  const [active, setActive] = useState(false);
  // State variable for tracking error state (incorrect password)
  const [error, setError] = useState(false);

  // Initialize navigation function using the useNavigate hook
  const navigation = useNavigate();

  // Handler function that gets called when Submit button is clicked or Enter key is pressed
  const clickHandler = () => {
    if (password === process.env.REACT_APP_FIRST_PASSWORD) {
      // Navigate to the "/one" route if the password is "one"
      navigation("/one");
    } else if (password === process.env.REACT_APP_SECOND_PASSWORD) {
      // Navigate to the "/two" route if the password is "two"
      navigation("/two");
    } else {
      // Set error state to true if the password is neither "one" nor "two"
      setError(true);
    }
  };

  // Render the JSX for the MainPage component
  return (
    // Wrapped in AnimatedGradientBackground component for a dynamic background
    <AnimatedGradientBackground>
      {/* Unstyled div container */}
      <div className="flex flex-col justify-center items-center h-screen">
        {/* Embed an iframe with a particle animation sourced from an external URL */}
        <iframe
          title="Particle Animation"
          src="https://particle-effect-bg-html.vercel.app/"
          className="absolute left-0 top-0 w-full h-full opacity-30"
        />
        {/* Input group for password entry */}
        <div
          // Use classnames utility to conditionally combine classes
          className={cn({
            // Common classes for all states
            "flex relative flex-row items-center w-[240px] lg:w-[315px] bg-white border border-solid hover:border-[#ddd] focus:border-[#000] rounded-[26px] text-[#333] outline-0": true,
            // Add red border on error
            "!border-red-500": error,
            // White border normally
            "border-white": !error,
          })}
        >
          {/* Password input field */}
          <input
            type="password"
            name="password"
            autoFocus={true}
            placeholder="Enter password..."
            className="rounded-l-[26px] border-none text-[#333] text-[14px] leading-none outline-0 px-[18px] py-[12px] lg:w-[244px] w-[157px]"
            onChange={(e) => {
              // Update the password state with the new value
              setPassword(e.target.value);
              // Activate the submit button if input is not empty
              if (e.target.value !== "") setActive(true);
              else setActive(false);
            }}
            onKeyDown={(e) => {
              // Trigger clickHandler function if Enter key is pressed
              if (e.key === "Enter") {
                clickHandler();
              }
            }}
          />
          {/* Submit button */}
          <button
            type="button"
            // Use classnames utility to conditionally combine classes
            className={cn({
              "w-fit h-[34px] lg:mr-[6px] text-[12px] text-white font-bold px-[20px] pb-px rounded-full transition-all duration-300": true,
              // Button is black and clickable when active
              "bg-black": active,
              // Button is semi-transparent and not clickable when not active
              "bg-[#222] bg-opacity-20 cursor-not-allowed": !active,
            })}
            // Call clickHandler when the button is clicked
            onClick={clickHandler}
          >
            Submit
          </button>
        </div>
        {/* Error message displayed when the password is incorrect */}
        <p
          // Use classnames utility to conditionally combine classes
          className={cn({
            "text-red-500 w-[240px] lg:w-[315px] text-left px-3 mt-[3px] font-normal": true,
            // Make error message visible if there is an error
            "opacity-100 visible": error,
            // Hide error message if there is no error
            "opacity-0 invisible": !error,
          })}
        >
          Password is incorrect.
        </p>
      </div>
    </AnimatedGradientBackground>
  );
}

// Export the MainPage component as the default export
export default MainPage;
