import { Plus, Search } from "lucide-react";
import Sidebar from "../components/SideBar";

const users = [
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
];

const UsersRoles = () => {
  return (
    <div className="flex min-h-screen">
      {/* Main content */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Users & Roles</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage user permissions and access levels
            </p>
          </div>

          <button className="btn btn-primary bg-[#1d4ed8] hover:bg-blue-700 border-none normal-case rounded-lg px-6 w-full sm:w-auto flex items-center justify-center">
            <Plus size={18} className="mr-1" />
            Add User
          </button>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-gray-700 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold">All Users</h2>
            <p className="text-gray-400 text-sm">
              View and manage all system users
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Search users..."
              className="input w-full pl-12 bg-transparent border-gray-700 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table w-full border-none min-w-[900px]">
              <thead>
                <tr className="text-[13px] uppercase tracking-wider">
                  <th className="bg-transparent pl-0 font-medium">S.N.</th>
                  <th className="bg-transparent font-medium">User</th>
                  <th className="bg-transparent font-medium">Email</th>
                  <th className="bg-transparent font-medium text-center">
                    Role
                  </th>
                  <th className="bg-transparent font-medium text-center">
                    Status
                  </th>
                  <th className="bg-transparent text-left pl-0 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {users.map((u, index) => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors">
                    <td className="pl-0">{index + 1}</td>

                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-9 rounded-full">
                            <img
                              src={`https://ui-avatars.com/api/?name=${u.name}&background=1d4ed8&color=ffffff`}
                              alt="avatar"
                            />
                          </div>
                        </div>
                        <span className="font-semibold">{u.name}</span>
                      </div>
                    </td>

                    <td>{u.email}</td>

                    <td className="text-center">
                      <span className="badge border-none py-3 px-4 text-xs font-semibold rounded-md bg-gray-700 text-gray-300">
                        {u.role}
                      </span>
                    </td>

                    <td className="text-center">
                      <span
                        className={`badge border-none py-3 px-4 text-xs font-semibold rounded-md ${
                          u.status === "Active"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>

                    <td className="text-right pr-0">
                      <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-5">
                        <button className="font-medium">View</button>
                        <button className="font-medium">Edit</button>
                        <button className="font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsersRoles;
