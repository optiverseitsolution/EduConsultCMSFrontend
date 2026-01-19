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
  // Add new routes here AND in App.jsx
  const navItems = [
    { id: "dashboard", label: "Dashboard", path: "/", icon: LayoutDashboard },
    {
      id: "users-roles",
      label: "Users & Roles",
      path: "/userrole",
      icon: Shield,
    },
    {
      id: "students",
      label: "Students",
      path: "/student",
      icon: GraduationCap,
    },
    { id: "courses", label: "Courses", path: "/courses", icon: BookOpen },
    {
      id: "universities",
      label: "Universities",
      path: "/universities",
      icon: Building2,
    },
    {
      id: "counselors",
      label: "Counselors",
      path: "/counselor",
      icon: UserCog,
    },
    {
      id: "consultancy",
      label: "Consultancy",
      path: "/consultancy",
      icon: Briefcase,
    },
    { id: "fees", label: "Fee Structure", path: "/fee", icon: DollarSign },
  ];

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const linkClass = ({ isActive }) =>
    `btn btn-block md:justify-start justify-center gap-3 hover:bg-green-600 ${
      isActive ? "bg-blue-600 text-white" : "btn-ghost"
    }`;

  return (
    <aside className="w-16 md:w-64 min-h-screen border-r border-gray-700 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-center md:justify-around border-b border-gray-700 py-4 px-4">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <GraduationCap size={32} />
          </div>
          <h1 className="hidden md:flex text-xl font-bold text-center">
            EduConsult CMS
          </h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 my-5 p-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={linkClass}
                end={item.path === "/"}
              >
                <Icon />
                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="space-y-4">
        {/* Theme Toggle */}
<<<<<<< HEAD
        {/* Theme Toggle */}
        <div className="mx-2 mb-2">
          <div
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="flex items-center justify-center md:justify-between gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-base-200 transition"
          >
            {/* Left: Icon + Label */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-base-200">
                {theme === "light" ? <FaMoon size={14} /> : <FaSun size={14} />}
              </div>
              <span className="hidden md:inline text-sm font-medium">
                Theme
              </span>
            </div>

            {/* Right: Switch */}
            <div
              className={`relative w-10 h-5 rounded-full transition-colors
        ${theme === "dark" ? "bg-blue-600" : "bg-gray-400"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow
          transition-transform
          ${theme === "dark" ? "translate-x-5" : "translate-x-0"}`}
              />
            </div>
          </div>
        </div>
=======
        <label className="swap swap-rotate self-center md:self-start px-3">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <FaSun className="swap-off text-xl" />
          <FaMoon className="swap-on text-xl" />
        </label>
>>>>>>> dev

        {/* User Info */}
        <div className="flex items-center justify-center md:justify-start gap-3 p-3 border-t border-gray-700 bg-base-200/50">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <User2 size={18} />
          </div>
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
