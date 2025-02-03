import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Exhibits from "./pages/Exhibits";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exhibits" element={<Exhibits />} />
      </Routes>
    </>
  );
}

export default App;
