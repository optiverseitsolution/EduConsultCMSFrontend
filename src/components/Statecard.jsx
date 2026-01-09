const StatCard = ({ title, value, change }) => {
  const isPositive = change?.startsWith("+");

  return (
    <div className="card bg-base-200 shadow-sm border border-gray-800">
      <div className="card-body p-5">
        <p className="text-sm ">{title}</p>

        <h2 className="text-2xl font-bold">
          {value}
        </h2>

        <p
          className={`text-sm font-medium ${
            isPositive ? "text-success" : "text-error"
          }`}
        >
          {change}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
