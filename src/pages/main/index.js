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
      {/* <div className="flex flex-col justify-center items-center h-screen">
        <iframe
          title="Particle Animation"
          src="https://particle-effect-bg-html.vercel.app/"
          className="absolute left-0 top-0 w-full h-full opacity-30"
        />
        <div
          className={cn({
            "flex relative flex-row items-center w-[240px] lg:w-[315px] bg-white border border-solid hover:border-[#ddd] focus:border-[#000] rounded-[26px] text-[#333] outline-0": true,
            "!border-red-500": error,
            "border-white": !error,
          })}
        >
          <input
            type="password"
            name="password"
            autoFocus={true}
            placeholder="Enter password..."
            className="rounded-l-[26px] border-none text-[#333] text-[14px] leading-none outline-0 px-[18px] py-[12px] lg:w-[244px] w-[157px]"
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value !== "") setActive(true);
              else setActive(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                clickHandler();
              }
            }}
          />
          <button
            type="button"
            className={cn({
              "w-fit h-[34px] lg:mr-[6px] text-[12px] text-white font-bold px-[20px] pb-px rounded-full transition-all duration-300": true,
              "bg-black": active,
              "bg-[#222] bg-opacity-20 cursor-not-allowed": !active,
            })}
            onClick={clickHandler}
          >
            Submit
          </button>
        </div>
        <p
          className={cn({
            "text-red-500 w-[240px] lg:w-[315px] text-left px-3 mt-[3px] font-normal": true,
            "opacity-100 visible": error,
            "opacity-0 invisible": !error,
          })}
        >
          Password is incorrect.
        </p>
      </div> */}
    </AnimatedGradientBackground>
  );
}

// Export the MainPage component as the default export
export default MainPage;
