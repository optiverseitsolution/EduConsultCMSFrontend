// import { useState } from 'react'

import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Courses from "./components/Courses.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="courses" element={<Courses />} />
      </Route>
    </Routes>
  );
}

export default App;
