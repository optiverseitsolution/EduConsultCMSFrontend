import React, { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import FormModal from "../components/modal/FormModal";
import {
  deleteUser,
  getAllUsers,
  registerUser,
  updateUser,
  updateUserStatus,
} from "../api/userRolesService";
import UpdateModal from "../components/modal/UpdateModal";

const headers = ["S.N.", "User", "Email", "Role", "Status", "Actions"];

const UsersRoles = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  /** Modal Fields */
  const userFields = [
    { name: "name", label: "Full Name", placeholder: "John Doe" },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "john@example.com",
    },
    { name: "password", label: "Password", type: "password" },
    {
      name: "password_confirmation",
      label: "Confirm Password",
      type: "password",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: ["Super Admin", "Admin", "Manager", "Counselor"],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
  ];

  const userUpdateFields = [
    { name: "name", label: "Full Name", placeholder: "John Doe" },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "john@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: ["Super Admin", "Admin", "Manager", "Counselor"],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
  ];

  /** Add User */
  const handleAddUser = async (newUser) => {
    try {
      const payload = {
        ...newUser,
        status: newUser.status === "Active" ? "1" : "0",
      };
      const created = await registerUser(payload);

      const formattedUser = {
        id: created.id,
        name: created.name,
        email: created.email,
        role: created.role,
        status:
          created.status === 0 || created.status === "0"
            ? "Inactive"
            : "Active",
      };

      setUsers((prev) => [...prev, formattedUser]);

      setSuccess("User Created");
      setError("");
    } catch (err) {
      setError("Error creating user");
      throw err;
    }
  };

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;

    return users.filter((u) => {
      const haystack =
        `${u.name} ${u.email} ${u.role} ${u.status}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [users, query]);

  const openAddModal = () => {
    const el = document.getElementById("add_user_modal");
    if (el?.showModal) el.showModal();
  };

  //get all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        const formattedUsers = users.map((item) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          role: item.role,
          status:
            item.status === 0 || item.status === "0" ? "Inactive" : "Active",
        }));
        setUsers(formattedUsers);
      } catch (err) {
        throw err;
      }
    };
    fetchUsers();
  }, []);

  // delete users
  const handleDeleteUser = async (user) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }
    try {
      await deleteUser({ id: user.id });

      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (err) {
      console.error("Failed to delete user", err);
      alert("Failed to delete university. Please try again.");
    }
  };

  //update
  const handleEditUser = async (updatedData) => {
    if (!selectedUser?.id) {
      console.log("Missing ID:", selectedUser);
      return;
    }

    try {
      const payload = {
        id: selectedUser.id,
        name: updatedData.name,
        email: updatedData.email,
        role: updatedData.role,
        status: updatedData.status === "Active" ? 1 : 0,
        password: updatedData.password || undefined,
      };

      const updated = await updateUser(payload);

      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? {
                id: updated.id,
                name: updated.name,
                email: updated.email,
                role: updated.role,
                status:
                  updated.status === 0 || updated.status === "0"
                    ? "Inactive"
                    : "Active",
              }
            : u,
        ),
      );

      document.getElementById("update_user_modal").close();
      setSelectedUser(null);
      setSuccess("User Updated Successfully");
      setError("");
    } catch (err) {
      console.log("Update error:", err.response?.data);
      setError(err.response?.data?.message || "Update failed");
    }
  };

  //status
  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const statusNumber = currentStatus === "Active" ? 1 : 0;
      const newStatus = statusNumber === 1 ? 0 : 1;

      const updated = await updateUserStatus(userId, newStatus);

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { ...u, status: newStatus === 1 ? "Active" : "Inactive" }
            : u,
        ),
      );
      setSuccess("Status updated");
      setError("");
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Users & Roles</h1>
          <p className="text-gray-400">
            Manage user permissions and access levels
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* Card */}
      <div className="rounded-lg p-4 sm:p-6 border border-gray-400">
        <h2 className="text-lg font-semibold mb-2">All Users</h2>
        <p className="text-gray-400 text-sm mb-4">
          View and manage all system users
        </p>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-2 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {error && <span className="text-red-500">{error}</span>}

        {success && <span className="text-green-500">{success}</span>}

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <Table
            headers={headers}
            data={filteredUsers}
            renderRow={(u, index) => (
              <tr
                key={u.id}
                className="border-b border-gray-700 hover:bg-base-300"
              >
                <td className="px-2 sm:px-4 py-4">{index + 1}</td>

                <td className="px-2 sm:px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        u.name,
                      )}`}
                      alt={u.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{u.name}</span>
                  </div>
                </td>

                <td className="px-2 sm:px-4 py-4">{u.email}</td>

                <td className="px-2 sm:px-4 py-4 text-center">
                  <span className="bg-gray-600 text-white px-3 py-1 rounded-lg text-xs">
                    {u.role}
                  </span>
                </td>

                <td className="px-2 sm:px-4 py-4">
                  <button
                    onClick={() => handleToggleStatus(u.id, u.status)}
                    className={`${
                      u.status === "Active"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-600 hover:bg-gray-700"
                    } text-white px-3 py-1 rounded-lg text-xs transition-colors`}
                  >
                    {u.status}
                  </button>
                </td>

                <td className="px-2 sm:px-4 py-4">
                  <div className="flex gap-3 text-sm">
                    <button
                      className="hover:text-blue-300"
                      onClick={() => console.log("View", u)}
                    >
                      View
                    </button>
                    <button
                      className="hover:text-blue-300"
                      onClick={() => {
                        setSelectedUser(u);
                        document
                          .getElementById("update_user_modal")
                          .showModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:text-red-300"
                      onClick={() => handleDeleteUser(u)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )}
          />
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredUsers.map((u) => (
            <MobileCard
              key={u.id}
              title={u.name}
              fields={[
                { label: "Email", value: u.email },
                { label: "Role", value: u.role },
                { label: "Status", value: u.status },
              ]}
              actions={[
                {
                  label: "View",
                  className: "text-blue-400 text-sm",
                  onClick: () => console.log("View", u),
                },
                {
                  label: "Edit",
                  className: "text-blue-400 text-sm",
                  onClick: () => {
                    setSelectedUser(u);
                    document.getElementById("update_user_modal").showModal();
                  },
                },
                {
                  label: "Delete",
                  className: "text-red-400 text-sm",
                  onClick: () => console.log("Delete", u),
                },
              ]}
            />
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-gray-400 text-sm">No users found.</div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      <FormModal
        id="add_user_modal"
        title="Add User"
        fields={userFields}
        onSave={handleAddUser}
      />

      <UpdateModal
        id="update_user_modal"
        title="Edit User"
        fields={userUpdateFields}
        data={selectedUser}
        onSave={handleEditUser}
      />
    </div>
  );
};

export default UsersRoles;
