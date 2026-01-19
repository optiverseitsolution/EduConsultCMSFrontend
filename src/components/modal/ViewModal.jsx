import React from "react";

const ViewModal = ({ id, title, fields, data }) => {
  if (!data) return null;

  return (
    <dialog id={id} className="modal">
      <div className="modal-box w-11/12 max-w-4xl">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {fields.map((field) => (
            <div key={field.name}>
              <p className="label font-medium">{field.label}</p>

              {field.type === "file" && data[field.name] ? (
                <img
                  src={
                    typeof data[field.name] === "string"
                      ? data[field.name]
                      : URL.createObjectURL(data[field.name])
                  }
                  alt={field.label}
                  className="w-16 h-16 object-cover"
                />
              ) : (
                <div>{data[field.name] ?? "-"}</div>
              )}
            </div>
          ))}
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ViewModal;
