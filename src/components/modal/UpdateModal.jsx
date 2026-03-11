import React, { useState, useEffect } from "react";

const UpdateModal = ({ id, title, fields = [], data = {}, onSave }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(data ? { ...data } : {});
    setErrors({});
  }, [data]);

  const closeDialog = () => {
    const dialog = document.getElementById(id);
    if (dialog && typeof dialog.close === "function") {
      dialog.close();
    }
  };

  const handleChange = (name, value, type) => {
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" && value !== "" ? Number(value) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      if (field.type === "file") return;

      if (field.type === "number") {
        if (value === "" || value === null || value === undefined || Number.isNaN(value)) {
          newErrors[field.name] = `${field.label} is required`;
        } else if (value < 0) {
          newErrors[field.name] = `${field.label} cannot be negative`;
        }
      } else if (field.name !== "password" && !value?.toString().trim()) {
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

      closeDialog();
      setFormData({});
      setErrors({});
    } catch (err) {
      if (err?.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err?.message) {
        setErrors({ general: err.message });
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
            <button className="btn btn-sm btn-circle btn-ghost" type="submit">
              ✕
            </button>
          </form>
        </div>

        {errors.general && (
          <p className="text-red-500 text-sm mb-4">{errors.general}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {fields.map((field) => (
            <div key={field.name}>
              <label className="label font-medium">{field.label}</label>

              {field.type === "file" ? (
                <>
                  <div className="flex items-center gap-2">
                    {formData[field.name] &&
                      typeof formData[field.name] === "string" && (
                        <img
                          src={formData[field.name]}
                          alt="Preview"
                          className="mt-2 w-20 h-20 object-cover rounded"
                        />
                      )}

                    <label
                      className={`flex items-center justify-between gap-4 input input-bordered w-full px-4 py-3 cursor-pointer ${
                        errors[field.name] ? "border-red-500" : ""
                      }`}
                    >
                      <span className="text-sm text-gray-500 truncate">
                        {formData[field.name] instanceof File
                          ? formData[field.name].name
                          : typeof formData[field.name] === "string" && formData[field.name]
                          ? "Current file selected"
                          : "Choose file"}
                      </span>

                      <span className="btn btn-sm btn-outline" type="button">
                        Browse
                      </span>

                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleChange(field.name, e.target.files?.[0] || null, "file")
                        }
                      />
                    </label>
                  </div>

                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </>
              ) : field.type === "textarea" ? (
                <>
                  <textarea
                    className={`textarea textarea-bordered w-full ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                    value={formData[field.name] || ""}
                    placeholder={field.placeholder}
                    onChange={(e) =>
                      handleChange(field.name, e.target.value, "textarea")
                    }
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
                    onChange={(e) =>
                      handleChange(field.name, e.target.value, "select")
                    }
                  >
                    <option value="">Select {field.label}</option>

                    {field.options?.map((option, index) => (
                      <option
                        key={typeof option === "object" ? option.value : index}
                        value={typeof option === "object" ? option.value : option}
                      >
                        {typeof option === "object" ? option.label : option}
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
                    value={formData[field.name] ?? ""}
                    placeholder={field.placeholder}
                    className={`input input-bordered w-full ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                    onChange={(e) =>
                      handleChange(field.name, e.target.value, field.type)
                    }
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
              onClick={closeDialog}
              disabled={loading}
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