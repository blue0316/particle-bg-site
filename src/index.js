import React from "react"; // Importing React library for building user interfaces.
import ReactDOM from "react-dom/client"; // Importing ReactDOM package to interact with the DOM.
import { BrowserRouter } from "react-router-dom"; // Importing BrowserRouter for handling routing in a web application.
import "./index.css"; // Importing CSS styling for the base index file.
import App from "./App"; // Importing the App component from the App.js file.
import reportWebVitals from "./reportWebVitals"; // Importing the utility to measure performance of the app.

// Creating a root reference by selecting the 'root' element from the HTML document.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering our React application within the 'root' element wrapped in different providers and modes.
root.render(
  // StrictMode is a tool for highlighting potential problems in an application, but it does not render any visible UI.
  <React.StrictMode>
    {/* BrowserRouter wraps the application and enables dynamic routing throughout the app. */}
    <BrowserRouter>
      {/* App is the main component that represents the core of the application UI. */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// The function reportWebVitals can be used to monitor the performance of your app.
// This could either log metrics to the console or send them to an endpoint for analysis.
reportWebVitals();

