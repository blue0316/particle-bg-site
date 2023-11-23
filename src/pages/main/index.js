import { useState } from "react";
import AnimatedGradientBackground from "../../components/AnimatedGradientBackground";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);

  const navigation = useNavigate();

  const clickHandler = () => {
    if (password === "one") {
      navigation("/one");
    } else if (password === "two") {
      navigation("/two");
    } else {
      window.alert("Your password is incorrect.");
    }
  };

  return (
    <AnimatedGradientBackground>
      <div className="flex justify-center items-center h-screen">
        <div className="flex relative flex-row items-center w-[420px] bg-white border border-solid border-[#fff] hover:border-[#ddd] focus:border-[#000] rounded-[26px] text-[#333] outline-0">
          <input
            type="password"
            name="password"
            autoFocus="true"
            placeholder="Enter password..."
            className="rounded-[26px] border-none text-[#333] text-[18px] leading-none outline-0 px-[25px] py-[15px] w-screen"
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
            className={
              active
                ? "w-fit h-10 mr-[7px] text-[15px] text-white font-bold bg-black px-[20px] pb-px rounded-full transition-all duration-300"
                : "w-fit h-10 mr-[7px] text-[15px] text-white font-bold bg-[#222] bg-opacity-20 px-[20px] pb-px rounded-full cursor-not-allowed transition-all duration-300"
            }
            onClick={clickHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </AnimatedGradientBackground>
  );
}

export default MainPage;
