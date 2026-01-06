const universities = [
  { name: "Oxford University", count: 145 },
  { name: "Cambridge University", count: 132 },
  { name: "MIT", count: 118 },
  { name: "Stanford University", count: 98 },
];

const TopUniversities = () => {
  return (
    <div className="bg-[#121821] p-5 rounded-xl">
      <h3 className="text-white font-semibold mb-4">Top Universities</h3>

      <ul className="space-y-3">
        {universities.map((u, i) => (
          <li key={i} className="flex justify-between text-gray-300">
            <span>{u.name}</span>
            <span>{u.count} applications</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUniversities;
