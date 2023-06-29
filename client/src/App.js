import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import Order from "./pages/Order/Order";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/orders", element: <Order /> },
    /*  { path: "/tasks", element: <Task /> },
    { path: "/tasks/:id", element: <TaskDetail /> }, */
  ]);
  return <RouterProvider router={router} />;
}

export default App;
