// root
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@/bootstrap.jsx";
// styles
import "@/Styles/App.scss";
import "mapbox-gl/dist/mapbox-gl.css";
// context
import { MainContextProvider } from "./Contexts/MainContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </React.StrictMode>
);
