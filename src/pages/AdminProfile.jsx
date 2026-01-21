import React, { useRef, useState } from "react";
import { Pencil, X } from "lucide-react";
import admin from "../assets/admin.jpg";

const AdminProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [editImg, setEditImg] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(admin);

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

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image");
      return;
    }

    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Profile</h1>
        <p className="text-gray-400">
          Manage your account settings and information.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 p-6 bg-base-300 border border-base-content/20 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div
            className="flex relative"
            onMouseEnter={() => setEditImg(true)}
            onMouseLeave={() => setEditImg(false)}
            onClick={handleClick}
          >
            <img
              src={preview}
              alt="Admin"
              className="md:w-28 h-28 rounded-full border-4 border-base-content/10"
            />
            {editImg && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white font-medium cursor-pointer">
                Choose Photo
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex flex-col items-center sm:items-start">
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
          <div className="flex flex-col gap-6 w-full sm:w-1/2">
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
              <button className="btn btn-outline w-fit max-sm:w-full">
                Change Password
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              className="btn bg-blue-600 w-full sm:w-auto"
              onClick={handleSave}
            >
              Save Changes
            </button>
            <button
              className="btn btn-ghost w-full sm:w-auto"
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
