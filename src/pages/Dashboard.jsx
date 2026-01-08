import Sidebar from "../components/SideBar.jsx";
import StatCard from "../components/Statecard.jsx";
import RecentApplications from "../components/RecentApplication.jsx";
import TopUniversities from "../components/TopUniversities.jsx";
import { Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  const isDashboardHome = location.pathname === "/";

  return (
    <div className="flex  min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 bg-black">
        {isDashboardHome ? (
          <>
            <h1 className="text-2xl text-white font-bold">Dashboard</h1>
            <p className="text-gray-400 mb-6">
              Welcome back! Here's your overview.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard title="Total Students" value="1,248" change="+12.5%" />
              <StatCard title="Active Courses" value="156" change="+8.2%" />
              <StatCard title="Total Counselors" value="42" change="+3" />
              <StatCard title="Total Universities" value="89" change="+5" />
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentApplications />
              <TopUniversities />
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Dashboard;