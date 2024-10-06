import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Message from "./components/Message";
import MessageContainer from "./components/MessageContainer";
import Inputmsg from "./components/Inputmsg";
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/message",
    element: <Message />,
  },
  {
    path: "/viewmessage",
    element: <MessageContainer />,
  },
  {
    path: "/send",
    element: <Inputmsg />,
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
