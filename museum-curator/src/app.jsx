import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Exhibits from "./pages/Exhibits";
import ExhibitDetails from "./pages/ExhibitDetails";
import Collections from "./pages/Collections";
import CollectionExhibits from "./pages/CollectionExhibits";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exhibits" element={<Exhibits />} />
        <Route path="/exhibits/:id" element={<ExhibitDetails />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:id" element={<CollectionExhibits />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />  
      </Routes>
    </>
  );
}

export default App;
