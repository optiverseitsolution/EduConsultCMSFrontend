import React, { useState } from "react";
import { Plus } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import FormModal from "../components/modal/FormModal";

const Counselors = () => {
  const [counselors, setCounselors] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.counselor@example.com",
      countries: "UK, USA",
      status: "Available",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.counselor@example.com",
      countries: "Australia, Canada",
      status: "Busy",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.counselor@example.com",
      countries: "Japan, South Korea",
      status: "Available",
    },
  ]);

  const headers = [
    "S.N.",
    "Counselor",
    "Email",
    "Counseling Countries",
    "Status",
    "Actions",
  ];

  /** 🔹 Modal Fields */
  const counselorFields = [
    {
      name: "name",
      label: "Counselor Name",
      placeholder: "John Doe",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "john@example.com",
    },
    {
      name: "countries",
      label: "Counseling Countries",
      placeholder: "UK, USA",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Available", "Busy"],
    },
  ];

  /** 🔹 Add Counselor */
  const handleAddCounselor = (newCounselor) => {
    setCounselors((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newCounselor,
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Counselors</h1>
          <p className="text-gray-400">
            Manage counselor assignments and availability
          </p>
        </div>

        <button
          onClick={() =>
            document.getElementById("add_counselor_modal").showModal()
          }
          className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto"
        >
          <Plus size={18} /> Add Counselor
        </button>
      </div>

      {/* Content Card */}
      <div className="rounded-lg p-4 sm:p-6 border border-gray-400">
        <h2 className="text-lg font-semibold mb-2">All Counselors</h2>
        <p className="text-gray-400 text-sm mb-4">
          View and manage all counselors and their assignments
        </p>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search counselors..."
              className="w-full pl-10 pr-2 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            headers={headers}
            data={counselors}
            renderRow={(c, index) => (
              <tr
                key={c.id}
                className="border-b border-gray-700 hover:bg-gray-800"
              >
                <td className="px-2 sm:px-4 py-4">{index + 1}</td>

                <td className="px-2 sm:px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${c.name}`}
                      alt={c.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{c.name}</span>
                  </div>
                </td>

                <td className="px-2 sm:px-4 py-4">{c.email}</td>

                <td className="px-2 sm:px-4 py-4 text-center">
                  {c.countries}
                </td>

                <td className="px-2 sm:px-4 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs ${
                      c.status === "Available"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-600 text-gray-200"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="px-2 sm:px-4 py-4">
                  <div className="flex gap-3 text-sm">
                    <button className="hover:text-blue-300">View</button>
                    <button className="hover:text-blue-300">Edit</button>
                    <button className="hover:text-red-300">Delete</button>
                  </div>
                </td>
              </tr>
            )}
          />

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {counselors.map((c) => (
              <MobileCard
                key={c.id}
                title={c.name}
                fields={[
                  { label: "Email", value: c.email },
                  { label: "Countries", value: c.countries },
                  { label: "Status", value: c.status },
                ]}
                actions={[
                  {
                    label: "View",
                    className: "text-blue-400 text-sm",
                    onClick: () => console.log("View", c),
                  },
                  {
                    label: "Edit",
                    className: "text-blue-400 text-sm",
                    onClick: () => console.log("Edit", c),
                  },
                  {
                    label: "Delete",
                    className: "text-red-400 text-sm",
                    onClick: () => console.log("Delete", c),
                  },
                ]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Add Counselor Modal */}
      <FormModal
        id="add_counselor_modal"
        title="Add Counselor"
        fields={counselorFields}
        onSave={handleAddCounselor}
      />
    </div>
  );
};

export default Counselors;
