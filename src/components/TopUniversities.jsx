import { useEffect, useState } from "react";
import { getAllUniversity } from "../api/universityService";

const TopUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const res = await getAllUniversity();

        if (res.message) {
          setUniversities([]);
        } else {
          setUniversities(res);
        }
      } catch (err) {
        console.error("Failed to fetch universities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return (
    <div className="rounded-xl border border-gray-700 hover:bg-base-300">
      <div className="p-5 sm:p-6">
        <h3 className="text-base font-semibold font-sans mb-4">
          Top Universities
        </h3>
        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : (
          <ul className="divide-y divide-gray-800">
            {universities.slice(0, 5).map((u) => (
              <li key={u.id} className="flex items-center justify-between py-3">
                <span className="text-sm font-medium truncate">
                  {u.university_name}
                </span>

                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {u.programs || 0} programs
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopUniversities;
