import React from "react"; // Importing React library for building user interfaces.
import { Routes, Route } from "react-router-dom"; // Importing Routes and Route components for routing functionality.
import "./App.css"; // Importing CSS styles for the App component.
import PageOne from "./pages/page1"; // Importing PageOne component from pages directory.
import PageTwo from "./pages/page2"; // Importing PageTwo component from pages directory.
import MainPage from "./pages/main"; // Importing MainPage component from pages directory.

// The App functional component serves as the main layout component where routes are defined.
function App() {
  return (
    // Wrapping the entire application with a div with a class of App, usually for styling purposes.
    <div className="App">
      {/* Declaring the routing structure within the Routes component */}
      <Routes>
        {/* Route definition for the root path ("/"), rendering the MainPage component. */}
        <Route path="/" element={<MainPage />} />
        {/* Route definition for path "/one", rendering the PageOne component. */}
        <Route path="one" element={<PageOne />} />
        {/* Route definition for path "/two", rendering the PageTwo component. */}
        <Route path="two" element={<PageTwo />} />
      </Routes>
    </div>
  );
}

export default App; // Exporting the App component to be used in index.js as the root component.
