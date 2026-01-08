const applications = [
  { name: "Student Name 1", uni: "University 1", status: "Pending" },
  { name: "Student Name 2", uni: "University 2", status: "Pending" },
  { name: "Student Name 3", uni: "University 3", status: "Pending" },
  { name: "Student Name 4", uni: "University 4", status: "Pending" },
];

const RecentApplications = () => {
  return (
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body p-5">
        <h3 className="card-title text-base">
          Recent Applications
        </h3>

        <ul className="space-y-4">
          {applications.map((app, i) => (
            <li
              key={i}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">
                  {app.name}
                </p>
                <p className="text-sm opacity-70">
                  Applied to {app.uni}
                </p>
              </div>

              <span className="badge badge-success  badge-outline">
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
