import React from "react";
import './App.css';
// import Frontpage from "./Frontpage";
import Frontpage from "./Frontpage";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <div>
      <ThemeProvider>
        <Frontpage/>
      </ThemeProvider>
    </div>
  )
}

export default App