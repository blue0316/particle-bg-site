import { useState } from "react";
import AnimatedGradientBackground from "../../components/AnimatedGradientBackground";
import { useNavigate } from "react-router-dom";
import * as cn from "classnames";

function MainPage() {
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);

  const navigation = useNavigate();

  const clickHandler = () => {
    if (password === "one") {
      navigation("/one");
    } else if (password === "two") {
      navigation("/two");
    } else {
      setError(true);
    }
  };

  return (
    <AnimatedGradientBackground>
      <div className="flex flex-col justify-center items-center h-screen">
        <div
          className={cn({
            "flex relative flex-row items-center w-[320px] lg:w-[420px] bg-white border border-solid hover:border-[#ddd] focus:border-[#000] rounded-[26px] text-[#333] outline-0": true,
            "!border-red-500": error,
            "border-white": !error,
          })}
        >
          <input
            type="password"
            name="password"
            autoFocus={true}
            placeholder="Enter password..."
            className="rounded-l-[26px] border-none text-[#333] text-[18px] leading-none outline-0 px-[25px] py-[15px] lg:w-auto w-[226px]"
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
              "w-fit h-10 lg:mr-[7px] text-[15px] text-white font-bold px-[20px] pb-px rounded-full transition-all duration-300": true,
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
            "text-red-500 w-[320px] lg:w-[420px] text-left px-4 mt-1 font-normal": true,
            "opacity-100 visible": error,
            "opacity-0 invisible": !error,
          })}
        >
          Password is incorrect.
        </p>
      </div>
    </AnimatedGradientBackground>
  );
}

export default MainPage;
