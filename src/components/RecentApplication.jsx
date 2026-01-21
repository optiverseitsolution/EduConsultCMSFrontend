const applications = [
  { name: "Student Name 1", uni: "University 1", status: "Pending" },
  { name: "Student Name 2", uni: "University 2", status: "Pending" },
  { name: "Student Name 3", uni: "University 3", status: "Pending" },
  { name: "Student Name 4", uni: "University 4", status: "Pending" },
];

const RecentApplications = () => {
  return (
    <div className="rounded-xl border border-gray-700 hover:bg-base-300 ">
      <div className="p-5 sm:p-6">
        {/* Title */}
        <h3 className="text-base font-semibold font-sans mb-4">
          Recent Applications
        </h3>

        {/* List */}
        <ul className="divide-y divide-gray-800">
          {applications.map((app, i) => (
            <li
              key={i}
              className="flex items-center justify-between py-3 gap-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {app.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  Applied to {app.uni}
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-900/40   border border-green-700 whitespace-nowrap">
                {app.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentApplications;
