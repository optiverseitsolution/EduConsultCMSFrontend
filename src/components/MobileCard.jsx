import React from "react";

const MobileCard = ({ title, image, fields = [], actions = [] }) => {
  return (
    <div className="rounded-lg p-2 border border-black">
      <div className="flex items-center gap-3 justify-between border-b border-gray-700">
        <div className="flex gap-4 items-center mb-2">
          {image && (
            <img
              src={image}
              alt={title}
              className="w-10 h-10 rounded-lg object-cover"
            />
          )}
          <h3 className="font-semibold text-md">{title}</h3>
        </div>
        {actions.length > 0 && (
          <div className="flex gap-4">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={action.className}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="text-sm  mt-3 space-y-1 grid grid-cols-2 max-sm:grid-cols-1">
        {fields.map((field, index) => (
          <p key={index}>
            <span className="font-medium">{field.label}:</span> {field.value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MobileCard;
