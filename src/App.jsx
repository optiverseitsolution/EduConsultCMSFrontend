// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Counselors from "./pages/Counsul.jsx";
import Courses from "./pages/Courses.jsx";
import Universities from "./pages/Universities.jsx";
import UsersRoles from "./pages/UsersRoles.jsx";
import Students from "./pages/Student.jsx";
import Consultancy from "./pages/Consultancy.jsx";
import FeeStructure from "./pages/FeeStructure.jsx";
import AdminProfile from "./pages/AdminProfile.jsx";
import Packages from "./pages/Packages.jsx";
import TourServices from "./pages/TourServices.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Routes>
      {/* Authentication - Index Route */}
      <Route index element={<Register />} />
      <Route path="/register" element={<Register />} />
 
      <Route path="login" element={<Login />} />
      {/* Layout Route */}

      <Route path="dashboard" element={<Dashboard />}>
        <Route path="userrole" element={<UsersRoles />} />
        <Route path="student" element={<Students />} />
        <Route path="courses" element={<Courses />} />
        <Route path="universities" element={<Universities />} />
        <Route path="counselor" element={<Counselors />} />
        <Route path="consultancy" element={<Consultancy />} />
        <Route path="fee" element={<FeeStructure />} />
        <Route path="admin-profile" element={<AdminProfile />} />
        <Route path="packages" element={<Packages />} />
        <Route path="tourservices" element={<TourServices />} />
      </Route>
    </Routes>
  );
}

export default App;
