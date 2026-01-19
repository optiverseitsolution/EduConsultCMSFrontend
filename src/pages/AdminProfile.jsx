import React, { useState } from "react";
import { Pencil, X } from "lucide-react";
import admin from "../assets/admin.jpg";

const AdminProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const [profile, setProfile] = useState({
    fullname: "Admin User",
    email: "admin@educonsult.com",
    phone: "+1 234 567 890",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    let newErrors = {};

    if (!profile.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!profile.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (profile.phone < 0) {
      newErrors.phone = "Phone number cannot be negative";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setEditMode(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Profile</h1>
        <p className="text-gray-400">
          Manage your account settings and information.
        </p>
      </div>

      <div className="flex justify-between items-center p-6 bg-base-300 border border-base-content/20 rounded-xl">
        <div className="flex items-center gap-4">
          <img
            src={admin}
            alt="Admin"
            className="w-28 h-28 rounded-full border-4 border-base-content/10"
          />

          <div>
            <h2 className="text-2xl font-bold">{profile.fullname}</h2>
            <p className="text-gray-400">Role: Super Admin</p>
            <p className="text-gray-400">Email: {profile.email}</p>
          </div>
        </div>

        <button
          className="btn btn-outline btn-sm gap-2"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? (
            <>
              <X size={16} /> Cancel
            </>
          ) : (
            <>
              <Pencil size={16} /> Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Edit Admin Profile */}
      {editMode && (
        <div className="bg-base-300 border border-base-content/20 rounded-xl p-6">
          <div className="flex flex-col gap-6 w-1/2">
            <div>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                name="fullname"
                value={profile.fullname}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.fullname && (
                <p className="text-error text-sm mt-1">{errors.fullname}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.phone && (
                <p className="text-error text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="flex flex-col justify-end">
              <label className="label">
                <span className="label-text font-medium">Security</span>
              </label>
              <button className="btn btn-outline w-fit">Change Password</button>
            </div>
          </div>

          <div className="mt-6">
            <button className="btn bg-blue-600" onClick={handleSave}>
              Save Changes
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
