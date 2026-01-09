// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Counselors from "./pages/Counsul.jsx";
import Courses from "./pages/Courses.jsx";
import Universities from "./pages/Universities.jsx";
import Consultancy from "./pages/Consultancy.jsx";
import FeeStructure from "./pages/FeeStructure.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="courses" element={<Courses />} />
        <Route path="universities" element={<Universities />} />
        <Route path="counselor" element={<Counselors />} />
        <Route path="consultancy" element={<Consultancy />} />
        <Route path="fee" element={<FeeStructure />} />
      </Route>
    </Routes>
  );
}

export default App;
