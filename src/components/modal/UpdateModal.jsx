import React, { useState, useEffect } from "react";

const UpdateModal = ({ id, title, fields, data, onSave }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      if (field.type === "file") return;

      if (field.type === "number") {
        if (value === "" || value === null || value === undefined) {
          newErrors[field.name] = `${field.label} is required`;
        }
        if (value < 0) {
          newErrors[field.name] = `${field.label} cannot be negative`;
        }
      } else if (field.name !== "password" && !value) {
      
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await onSave(formData);

      document.getElementById(id).close();
      setFormData({});
      setErrors({});
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: "Something went wrong" });
      }
    } finally {
      setLoading(false);
    }
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
                <div className="flex items-center gap-2">
                  {" "}
                  {formData[field.name] &&
                    typeof formData[field.name] === "string" && (
                      <img
                        src={formData[field.name]}
                        alt="Logo preview"
                        className="mt-2 w-20 h-20 object-cover rounded"
                      />
                    )}
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
                </div>
              ) : field.type === "textarea" ? (
                <>
                  <textarea
                    className={`textarea textarea-bordered w-full ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                    value={formData[field.name] || ""}
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />

                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </>
              ) : field.type === "select" ? (
                <>
                  <select
                    className={`select select-bordered w-full ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  >
                    <option value="">Select {field.label}</option>

                    {field.options?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

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
                    value={formData[field.name] || ""}
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
            <button
              type="submit"
              className="btn bg-blue-600 text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateModal;