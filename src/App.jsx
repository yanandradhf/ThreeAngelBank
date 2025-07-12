import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LoginPage from "./pages/LoginPage/LoginPage";
//import './App.css'
import Login from "./pages/Login"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <LoginPage /> */}
      <Login />
    </>
  );
}

export default App;
