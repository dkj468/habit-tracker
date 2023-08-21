import { RouterProvider, createBrowserRouter } from "react-router-dom";
import classes from "./App.module.css";
import Home from "./components/Home";

import HabitDetail from "./components/habit-detail/HabitDetail";
import NewHabit from "./components/habit/NewHabit";
import HabitsContainer from "./components/habits-container/HabitsContainer";
import SideNav from "./components/side-nav/SideNav";
import { useHabitsContext } from "./store/HabitsContext";
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
  // const { IsAddHabit } = useHabitsContext();

  return <RouterProvider router={appRouter} />;
};

export default App;
