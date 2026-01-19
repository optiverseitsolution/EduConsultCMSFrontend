import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import FormModal from "../components/modal/FormModal";

const headers = ["S.N.", "User", "Email", "Role", "Status", "Actions"];

const UsersRoles = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Super Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Counselor",
      status: "Active",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "Manager",
      status: "Inactive",
    },
  ]);

  const [query, setQuery] = useState("");

  /** Modal Fields */
  const userFields = [
    { name: "name", label: "Full Name", placeholder: "John Doe" },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "john@example.com",
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
  const handleAddUser = (newUser) => {
    setUsers((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1,
        ...newUser,
      },
    ]);
  };

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;

    return users.filter((u) => {
      const haystack = `${u.name} ${u.email} ${u.role} ${u.status}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [users, query]);

  const openAddModal = () => {
    const el = document.getElementById("add_user_modal");
    if (el?.showModal) el.showModal();
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

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <Table
            headers={headers}
            data={filteredUsers}
            renderRow={(u, index) => (
              <tr key={u.id} className="border-b border-gray-700 hover:bg-base-300">
                <td className="px-2 sm:px-4 py-4">{index + 1}</td>

                <td className="px-2 sm:px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        u.name
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

                <td className="px-2 sm:px-4 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs ${
                      u.status === "Active"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-600 text-gray-200"
                    }`}
                  >
                    {u.status}
                  </span>
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
                      onClick={() => console.log("Edit", u)}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:text-red-300"
                      onClick={() => console.log("Delete", u)}
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
                  onClick: () => console.log("Edit", u),
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
    </div>
  );
};

export default UsersRoles;
