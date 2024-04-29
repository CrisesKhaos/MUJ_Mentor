import { useState } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";

function App() {
  const [count, setCount] = useState(0);
  const router = createBrowserRouter([
    { path: "/", element: <Homepage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/dashboard", element: <Dashboard /> },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
