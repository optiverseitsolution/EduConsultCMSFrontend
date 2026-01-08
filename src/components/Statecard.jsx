const StatCard = ({ title, value, change }) => {
  const isPositive = change?.startsWith("+");

  return (
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body p-5">
        <p className="text-sm opacity-70">{title}</p>

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
