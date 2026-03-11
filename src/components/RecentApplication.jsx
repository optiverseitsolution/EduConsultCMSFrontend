import { useState, useEffect } from "react";
import { getStudents } from "../api/studentService";

const RecentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getStudents();

      const data = response.data.data || [];

      // sort newest first
      const sorted = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );

      // show only latest 5
      setApplications(sorted.slice(0, 5));
    } catch (error) {
      console.error("Failed to load students:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-700 hover:bg-base-300">
      <div className="p-5 sm:p-6">
        <h3 className="text-base font-semibold font-sans mb-4">
          Recent Applications
        </h3>

        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : (
          <ul className="divide-y divide-gray-800">
            {applications.map((app) => (
              <li
                key={app.id}
                className="flex items-center justify-between py-3 gap-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{app.student}</p>
                  <p className="text-xs text-gray-400 truncate">
                    Applied to {app.applied_university}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-900/40 border border-green-700 whitespace-nowrap">
                  {app.application}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecentApplications;
