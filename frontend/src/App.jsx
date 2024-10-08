import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";

import Sidebar from "./components/sidebar";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/sidebar",
    element: <Sidebar />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
]);

const App = () => {
  return (
    <div className="flex w-full  h-screencontent-center">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
