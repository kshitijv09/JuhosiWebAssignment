import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Task from "./pages/Task/Task";

import TaskDetail from "./pages/TaskDetail/TaskDetail";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/tasks", element: <Task /> },
    { path: "/tasks/:id", element: <TaskDetail /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
