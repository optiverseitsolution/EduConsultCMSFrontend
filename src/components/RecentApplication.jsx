const applications = [
  { name: "Student Name 1", uni: "University 1" },
  { name: "Student Name 2", uni: "University 2" },
  { name: "Student Name 3", uni: "University 3" },
  { name: "Student Name 4", uni: "University 4" },
];

const RecentApplications = () => {
  return (
    <div className="bg-[#121821] p-5 rounded-xl">
      <h3 className="text-white font-semibold mb-4">Recent Applications</h3>

      <ul className="space-y-3">
        {applications.map((app, i) => (
          <li key={i} className="flex justify-between items-center">
            <div>
              <p className="text-white">{app.name}</p>
              <p className="text-sm text-gray-400">
                Applied to {app.uni}
              </p>
            </div>
            <span className="text-xs px-3 py-1 bg-green-900 text-green-400 rounded-full">
              Pending
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentApplications;
