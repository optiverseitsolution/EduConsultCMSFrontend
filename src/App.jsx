// import { useState } from 'react'

import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Courses from "./pages/Courses.jsx";
import Universities from "./pages/Universities.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="courses" element={<Courses />} />
        <Route path="universities" element={<Universities />} />
      </Route>
    </Routes>
  );
}

export default App;
