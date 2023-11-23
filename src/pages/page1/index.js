import React from "react";
import { useNavigate } from "react-router-dom";

function PageOne() {
  const navigation = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-4xl">This is the first page.</h1>
      <button
        className="mt-4 px-4 py-2 rounded-full border border-[#ddd] hover:bg-[#ddd] transition-all duration-300"
        onClick={() => navigation("/")}
      >
        Back to Main Page.
      </button>
    </div>
  );
}

export default PageOne;
