// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Counselors from "./pages/Counsul.jsx";
import Courses from "./pages/Courses.jsx";
import Universities from "./pages/Universities.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="courses" element={<Courses />} />
        <Route path="universities" element={<Universities />} />
      </Route>

      <Route path="/counselor" element={<Counselors />} />
    </Routes>
  );
}

export default App;


