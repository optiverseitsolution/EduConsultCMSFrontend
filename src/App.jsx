// import { useState } from 'react'

import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Counselors from "./pages/Counsul.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/Counselor" element={<Counselors />} />
      
    </Routes>
  );
}

export default App;
