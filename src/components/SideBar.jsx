import { useEffect, useState } from "react";
import {
  BookOpen,
  Briefcase,
  Building2,
  DollarSign,
  GraduationCap,
  LayoutDashboard,
  Shield,
  User2,
  UserCog,
} from "lucide-react";

import { FaMoon, FaSun } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <aside className="w-16 md:w-64 min-h-screen border-r border-gray-700 flex flex-col justify-between">
      {/* Header */}
      <div className="">
        <div className="flex items-center justify-center md:justify-around border-b border-gray-700 py-4 px-4">
          <div className="p-2 bg-blue-600 rounded-lg">
            <GraduationCap size={32} />
          </div>
          <h1 className="hidden md:flex text-xl font-bold items-center justify-center text-center">
            EduConsult CMS
          </h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 my-5 p-1">
          {/* <button className="btn bg-blue-600 btn-block md:justify-start justify-center gap-3">
            <LayoutDashboard />
            <span className="hidden md:inline">Dashboard</span>
          </button> */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `btn btn-block md:justify-start justify-center gap-3 ${
                isActive ? "bg-blue-600" : "btn-ghost"
              }`
            }
          >
            <GraduationCap />
            <span className="hidden md:inline">Dashboard</span>
          </NavLink>

          

          <button className="btn btn-ghost btn-block md:justify-start justify-center gap-3">
            <GraduationCap />
            <span className="hidden md:inline">Students</span>
          </button>

          <button className="btn btn-ghost btn-block md:justify-start justify-center gap-3">
            <BookOpen />
            <span className="hidden md:inline">Courses</span>
          </button>

          <button className="btn btn-ghost btn-block md:justify-start justify-center gap-3">
            <Building2 />
            <span className="hidden md:inline">Universities</span>
          </button>

          <NavLink
            to="/Counselor"
            className={({ isActive }) =>
              `btn btn-block md:justify-start justify-center gap-3 ${
                isActive ? "bg-blue-600" : "btn-ghost"
              }`
            }
          >
            <UserCog />
            <span className="hidden md:inline">Counselors</span>
          </NavLink>

          <button className="btn btn-ghost btn-block md:justify-start justify-center gap-3">
            <Briefcase />
            <span className="hidden md:inline">Consultancy</span>
          </button>

          <button className="btn btn-ghost btn-block md:justify-start justify-center gap-3">
            <DollarSign />
            <span className="hidden md:inline">Dollar</span>
          </button>
        </nav>
      </div>

      {/* Footer */}
      <div className="space-y-4">
        {/* Theme Toggle */}
        <label className="swap swap-rotate self-center md:self-start">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          />

          <FaSun className="swap-off text-xl" />
          <FaMoon className="swap-on text-xl" />
        </label>

        {/* User Info */}
        <div className="flex items-center justify-center md:justify-start gap-3 p-3 border-t border-gray-700 bg-base-200/50">
          {/* Avatar / Icon */}
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <User2 size={18} />
          </div>

          {/* User Details */}
          <div className="leading-tight hidden md:block">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs opacity-60">admin@educonsult.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
