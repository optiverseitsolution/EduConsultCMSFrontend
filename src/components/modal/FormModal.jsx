import React, { useState } from "react";

const FormModal = ({ id, title, fields, onSave }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    fields.forEach((field) => {
      if (!formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    document.getElementById(id).close();
    setFormData({});
    setErrors({});
  };

  return (
    <dialog id={id} className="modal">
      <div className="modal-box w-11/12 max-w-4xl">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {fields.map((field, index) => (
            <div key={index}>
              <label className="label font-medium">{field.label}</label>

              {field.type === "file" ? (
                <>
                  <label
                    className={`flex items-center justify-between gap-4 input input-bordered w-full px-4 py-3 cursor-pointer
                      ${errors[field.name] ? "border-red-500" : ""}`}
                  >
                    <span className="text-sm text-gray-500">
                      {formData[field.name]?.name || "Choose file"}
                    </span>

                    <span className="btn btn-sm btn-outline">Browse</span>

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        handleChange(field.name, e.target.files[0])
                      }
                    />
                  </label>

                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    className={`input input-bordered w-full ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />

                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}

          <div className="modal-action md:col-span-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => document.getElementById(id).close()}
            >
              Cancel
            </button>
            <button type="submit" className="btn bg-blue-600 text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default FormModal;
