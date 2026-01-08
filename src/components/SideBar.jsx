import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Building2,
  UserCog,
  Briefcase,
  DollarSign,
  Shield,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { id: "dashboard", label: "Dashboard", path: "/", icon: LayoutDashboard },
    { id: "users-roles", label: "Users & Roles", path: "", icon: Shield },
    { id: "students", label: "Students", path: "", icon: GraduationCap },
    { id: "courses", label: "Courses", path: "courses", icon: BookOpen },
    {
      id: "universities",
      label: "Universities",
      path: "universities",
      icon: Building2,
    },
    { id: "counselors", label: "Counselors", path: "", icon: UserCog },
    { id: "consultancy", label: "Consultancy", path: "", icon: Briefcase },
    { id: "fees", label: "Fee Structure", path: "", icon: DollarSign },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#0B0F14] text-gray-300 p-4 relative max-md:hidden">
      <h1 className="text-xl font-bold text-white mb-6">EduConsult CMS</h1>

      <nav className="space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 focus:bg-blue-600 hover:text-white transition"
              onClick={() => navigate(item.path)}
            >
              <Icon />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 text-sm text-gray-400">
        Admin User <br />
        admin@educonsult.com
      </div>
    </aside>
  );
};

export default Sidebar;
