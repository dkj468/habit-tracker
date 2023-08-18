import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import HabitsContextProvider from "./src/store/HabitsContext";
import AuthContextProvider from "./src/store/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <HabitsContextProvider>
      <App />
    </HabitsContextProvider>
  </AuthContextProvider>
);
