import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PageOne from "./pages/page1";
import PageTwo from "./pages/page2";
import MainPage from "./pages/main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="one" element={<PageOne />} />
        <Route path="two" element={<PageTwo />} />
      </Routes>
    </div>
  );
}

export default App;
