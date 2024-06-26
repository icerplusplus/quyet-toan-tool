import React from "react";
import "./App.css";
import ExcelGenerator from "./components/ExcelGenerator";

interface President {
  Name: string;
  Index: number;
}



function App() {
  
  return (
    <>
      <ExcelGenerator />
    </>
  );
}

export default App;
