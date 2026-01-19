import React, { useState } from "react";

const AdminProfileModal = () => {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card bg-base-300 shadow-xl border border-base-content/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="space-y-5">
          <div>
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              name="fullname"
              value={data.fullname}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Phone Number</span>
            </label>
            <input
              type="number"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="label">
              <span className="label-text font-medium">Security</span>
            </label>
            <button className="btn btn-outline btn-sm w-fit">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileModal;
