const universities = [
  { name: "Oxford University", count: 145 },
  { name: "Cambridge University", count: 132 },
  { name: "MIT", count: 118 },
  { name: "Stanford University", count: 98 },
];

const TopUniversities = () => {
  const max = Math.max(...universities.map(u => u.count));

  return (
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body p-5">
        <h3 className="card-title text-base">
          Top Universities
        </h3>

        <ul className="space-y-4">
          {universities.map((u, i) => (
            <li key={i}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">
                  {u.name}
                </span>
                <span className="text-sm opacity-70">
                  {u.count}
                </span>
              </div>

              {/* Progress bar */}
              <progress
                className="progress progress-primary w-full"
                value={u.count}
                max={max}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopUniversities;
