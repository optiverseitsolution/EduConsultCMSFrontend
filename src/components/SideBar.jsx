import { FaHome, FaUserGraduate, FaBook, FaUniversity } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const MenuItems = [
    { name: "Dashboard", path: "/", icon: FaHome },
    { name: "Students", path: "", icon: FaUserGraduate },
    { name: "Courses", path: "courses", icon: FaBook },
    { name: "Universities", path: "", icon: FaUniversity },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#0B0F14] text-gray-300 p-4 relative">
      <h1 className="text-xl font-bold text-white mb-6">EduConsult CMS</h1>

      <nav className="space-y-2">
        {MenuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 focus:bg-blue-600 hover:text-white transition"
              onClick={() => navigate(item.path)}
            >
              <Icon />
              {item.name}
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
