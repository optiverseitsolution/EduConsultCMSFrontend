const universities = [
  { name: "Oxford University", count: 145 },
  { name: "Cambridge University", count: 132 },
  { name: "MIT", count: 118 },
  { name: "Stanford University", count: 98 },
];

const TopUniversities = () => {
  return (
    <div className="rounded-xl border border-gray-800 bg-base-200/60">
      <div className="p-5 sm:p-6">
        {/* Title */}
        <h3 className="text-base font-semibold mb-4">
          Top Universities
        </h3>

        {/* List */}
        <ul className="divide-y divide-gray-800">
          {universities.map((u, i) => (
            <li
              key={i}
              className="flex items-center justify-between py-3"
            >
              <span className="text-sm font-medium truncate">
                {u.name}
              </span>

              <span className="text-sm text-gray-400 whitespace-nowrap">
                {u.count} applications
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopUniversities;
