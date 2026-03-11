import React, { useRef, useState, useEffect } from "react";
import React, { useRef, useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import admin from "../assets/admin.jpg";
import { getProfile, updateProfile } from "../api/authService";

const AdminProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [editImg, setEditImg] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(admin);
  
  const [loading, setLoading] = useState(true);

  // 2. We start with empty strings (or fallbacks) instead of fake data
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // ==============================
  // FETCH PROFILE
  // ==============================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        setProfile({
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
        });

      } catch (error) {
        setApiError(
          error.response?.data?.message || "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================
  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==============================
  // SAVE PROFILE
  // ==============================
  const handleSave = async () => {
    let newErrors = {};

    if (!profile.name.trim()) newErrors.name = "Full name required";
    if (!profile.email.trim()) newErrors.email = "Email required";
    if (!profile.phone.trim()) newErrors.phone = "Phone required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      await updateProfile({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });

      setEditMode(false);
      setErrors({});
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Profile update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // IMAGE HANDLING (Frontend only)
  // ==============================
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

  if (loading) {
    return <div className="text-center p-10">Loading profile...</div>;
  }

  return (
    <div className="flex flex-col gap-6">

      {apiError && (
        <div className="text-red-500">{apiError}</div>
      )}

      <div>
        <h1 className="text-2xl font-bold">Admin Profile</h1>
        <p className="text-gray-400">
          Manage your account settings and information.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 p-6 bg-base-300 border border-base-content/20 rounded-xl">

        <div className="flex flex-col sm:flex-row items-center gap-4">

          {/* Profile Image */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setEditImg(true)}
            onMouseLeave={() => setEditImg(false)}
            onClick={handleClick}
          >
            <img
              src={preview}
              alt="Admin"
              className="w-28 h-28 rounded-full border-4 border-base-content/10"
            />

            {editImg && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white">
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
            {/* Show a loading message while waiting for the postman */}
            {loading ? (
              <div className="animate-pulse">
                <div className="h-6 w-32 bg-gray-500 rounded mb-2"></div>
                <div className="h-4 w-48 bg-gray-500 rounded"></div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{profile.fullname}</h2>
                <p className="text-gray-400">Role: Super Admin</p>
                <p className="text-gray-400">Email: {profile.email}</p>
                {/* Optional: Show phone number if you want */}
                {profile.phone && <p className="text-gray-400">Phone: {profile.phone}</p>}
              </>
            )}
          </div>
        </div>

        <button
          className="btn btn-outline btn-sm gap-2"
          onClick={() => setEditMode(!editMode)}
          disabled={loading} // Don't allow editing until data loads!
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

      {/* EDIT SECTION */}
      {editMode && (
        <div className="bg-base-300 border rounded-xl p-6">

          <div className="flex flex-col gap-4 w-full sm:w-1/2">

            <div>
              <label className="font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-error text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-error text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.phone && (
                <p className="text-error text-sm">{errors.phone}</p>
              )}
            </div>

          </div>

          <div className="mt-6 flex gap-3">
            <button
              className="btn bg-blue-600 text-white"
              onClick={handleSave}
            >
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