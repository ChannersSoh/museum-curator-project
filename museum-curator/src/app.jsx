import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Exhibits from "./pages/Exhibits";
import ExhibitDetails from "./pages/ExhibitDetails"; 
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exhibits" element={<Exhibits />} />
        <Route path="/exhibits/:id" element={<ExhibitDetails />} /> 
      </Routes>
    </>
  );
}

export default App;
