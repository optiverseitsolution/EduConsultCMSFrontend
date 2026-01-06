const StatCard = ({ title, value, change }) => {
  return (
    <div className="bg-[#121821] p-5 rounded-xl shadow">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold text-white mt-2">{value}</h2>
      <p className="text-green-500 text-sm mt-1">{change}</p>
    </div>
  );
};

export default StatCard;
