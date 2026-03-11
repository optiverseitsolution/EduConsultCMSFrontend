import Sidebar from "../components/SideBar.jsx";
import StatCard from "../components/Statecard.jsx";
import RecentApplications from "../components/RecentApplication.jsx";
import TopUniversities from "../components/TopUniversities.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUniversity } from "../api/universityService.js";
import { getAllCourse } from "../api/courseService.js";
import { getCounselors } from "./../api/conselorService";
import { getStudents } from "./../api/studentService";
import { Loader } from "lucide-react";

const Dashboard = () => {
  const location = useLocation();
  const isDashboardHome = location.pathname === "/dashboard";

  const [loading, setLoading] = useState(false);

  const [uniCount, setUniCounnt] = useState();
  const [activeCourses, setActiveCourses] = useState("");
  const [counselorsCount, setCounselorsCount] = useState("");
  const [studentCount, setStudentCount] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [uniRes, courseRes, counselorsRes, studentRes] =
          await Promise.all([
            getAllUniversity(),
            getAllCourse(),
            getCounselors(),
            getStudents(),
          ]);

        setUniCounnt(uniRes.length);

        const activeRes = courseRes.filter((c) => c.status === true);
        setActiveCourses(activeRes.length);

        setCounselorsCount(counselorsRes.length);
        setStudentCount(studentRes.data.data.length);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 min-w-0 p-4 sm:p-6 ">
        {isDashboardHome ? (
          <>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400 mb-6">
              Welcome back! Here's your overview.
            </p>

            {/* Stats */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {" "}
              {loading ? (
                <span className="w-screen">
                  <Loader size={28} className="animate-spin " />
                </span>
              ) : (
                <>
                  <StatCard
                    title="Total Students"
                    value={studentCount}
                    change="+12.5%"
                  />
                  <StatCard
                    title="Active Courses"
                    value={activeCourses}
                    change="+8.2%"
                  />
                  <StatCard
                    title="Total Counselors"
                    value={counselorsCount}
                    change="+3"
                  />
                  <StatCard
                    title="Total Universities"
                    value={uniCount}
                    change="+5"
                  />
                </>
              )}
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
