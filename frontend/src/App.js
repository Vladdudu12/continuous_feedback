import "./index.css";

import MenuAppBar from "./components/MenuAppBar/MenuAppBar";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import { Outlet } from "react-router-dom";
function App() {

  const [isProfessor, setIsProfessor] = useState(true);
  function changeProfessorState() {
    setIsProfessor(!isProfessor);
  }
  return (
    <>
      <h1>CEVA</h1>
    </>
  );
}

export default App;
