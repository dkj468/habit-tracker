import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import AuthContextProvider from "./src/store/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
