import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AppPage from "./pages/AppPage";
import SignupPage from "./pages/SignupPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/journel",
    element: <AppPage />,
  },
]);
const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
