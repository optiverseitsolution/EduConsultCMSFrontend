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
  Box,
  Plane,
  LogOut,
} from "lucide-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { getProfile } from "../api/authService";

const Sidebar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [loading, setLoading] = useState(true);

  // =============================
  // FETCH PROFILE
  // =============================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        setUser({
          name: response.data.name || "",
          email: response.data.email || "",
        });
      } catch (error) {
        console.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =============================
  // THEME HANDLING
  // =============================
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // =============================
  // LOGOUT
  // =============================
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { id: "users-roles", label: "Users & Roles", path: "userrole", icon: Shield },
    { id: "students", label: "Students", path: "student", icon: GraduationCap },
    { id: "courses", label: "Courses", path: "courses", icon: BookOpen },
    { id: "universities", label: "Universities", path: "universities", icon: Building2 },
    { id: "counselors", label: "Counselors", path: "counselor", icon: UserCog },
    { id: "consultancy", label: "Consultancy", path: "consultancy", icon: Briefcase },
    { id: "fees", label: "Fee Structure", path: "fee", icon: DollarSign },
    { id: "packages", label: "Packages", path: "packages", icon: Box },
    { id: "tour", label: "Tour Services", path: "tourservices", icon: Plane },
  ];

  const linkClass = ({ isActive }) =>
    `btn btn-block md:justify-start justify-center gap-3 transition ${
      isActive ? "bg-blue-600 text-white" : "btn-ghost hover:bg-base-200"
    }`;

  return (
    <aside className="w-16 md:w-64 min-h-screen border-r border-gray-700 flex flex-col justify-between">

      {/* ================= HEADER ================= */}
      <div>
        <div className="flex items-center justify-center md:justify-around border-b border-gray-700 py-4 px-4">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <GraduationCap size={32} />
          </div>
          <h1 className="hidden md:flex text-xl font-bold">
            EduConsult CMS
          </h1>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="space-y-1 my-5 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={linkClass}
              >
                <Icon size={18} />
                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="space-y-3">

        {/* Theme Toggle */}
        <div className="mx-2">
          <div
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
            className="flex items-center justify-center md:justify-between gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-base-200 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-base-200">
                {theme === "light" ? (
                  <FaMoon size={16} />
                ) : (
                  <FaSun size={16} />
                )}
              </div>
              <span className="hidden md:inline text-sm font-medium">
                Theme
              </span>
            </div>

            <div
              className={`hidden md:block relative w-10 h-5 rounded-full transition-colors ${
                theme === "dark"
                  ? "bg-blue-600"
                  : "bg-gray-400"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  theme === "dark"
                    ? "translate-x-5"
                    : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div
          className="flex items-center justify-center md:justify-start gap-3 p-3 border-t border-gray-700 bg-base-200/50 cursor-pointer"
          onClick={() => navigate("admin-profile")}
        >
          <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
            <User2 size={18} />
          </div>

          <div className="leading-tight hidden md:block overflow-hidden">
            {loading ? (
              <p className="text-sm opacity-50">Loading...</p>
            ) : (
              <>
                <p className="text-sm font-medium truncate">
                  {user.name}
                </p>
                <p className="text-xs opacity-60 truncate">
                  {user.email}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-2">
          <button
            onClick={handleLogout}
            className="btn btn-error btn-sm w-full flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;