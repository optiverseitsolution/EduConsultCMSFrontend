import { FaHome, FaUserGraduate, FaBook, FaUniversity } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-[#0B0F14] text-gray-300 p-4">
      <h1 className="text-xl font-bold text-white mb-6">EduConsult CMS</h1>

      <nav className="space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-2 bg-blue-600 text-white rounded-lg">
          <FaHome /> Dashboard
        </button>

        <button className="sidebar-btn"><FaUserGraduate /> Students</button>
        <button className="sidebar-btn"><FaBook /> Courses</button>
        <button className="sidebar-btn"><FaUniversity /> Universities</button>
      </nav>

      <div className="absolute bottom-4 text-sm text-gray-400">
        Admin User <br />
        admin@educonsult.com
      </div>
    </aside>
  );
};

export default Sidebar;
