import React, { useState } from "react";
import { Plus } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import FormModal from "../components/modal/FormModal";

const headers = [
  "S.N.",
  "Student",
  "Email",
  "Course",
  "Applied University",
  "Status",
  "Application",
  "Counselor",
  "Actions",
];

const Students = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      course: "BSc IT",
      university: "Oxford University",
      status: "Active",
      application: "Approved",
      counselor: "John Doe",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      course: "MSc CS",
      university: "MIT",
      status: "Active",
      application: "Pending",
      counselor: "Jane Smith",
    },
    {
      id: 3,
      name: "Carol White",
      email: "carol@example.com",
      course: "MBA",
      university: "Stanford",
      status: "Active",
      application: "Under Review",
      counselor: "Mike Johnson",
    },
  ]);

  /** 🔹 Modal Fields */
  const studentFields = [
    { name: "name", label: "Student Name", placeholder: "Alice Johnson" },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "alice@example.com",
    },
    { name: "course", label: "Course", placeholder: "BSc IT" },
    { name: "university", label: "Applied University" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
    {
      name: "application",
      label: "Application Status",
      type: "select",
      options: ["Approved", "Pending", "Under Review"],
    },
    { name: "counselor", label: "Counselor Name" },
  ];

  /** 🔹 Add Student */
  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newStudent,
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Students Management</h1>
          <p className="text-gray-400">
            Track and manage student applications
          </p>
        </div>

        <button
          onClick={() =>
            document.getElementById("add_student_modal").showModal()
          }
          className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {/* Card */}
      <div className="rounded-lg p-4 sm:p-6 border border-gray-400">
        <h2 className="text-lg font-semibold mb-2">All Students</h2>
        <p className="text-gray-400 text-sm mb-4">
          View and manage all registered students
        </p>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-2 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            headers={headers}
            data={students}
            renderRow={(s, index) => (
              <tr key={s.id} className="border-b border-gray-700">
                <td className="px-2 sm:px-4 py-4">{index + 1}</td>

                <td className="px-2 sm:px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${s.name}`}
                      alt={s.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{s.name}</span>
                  </div>
                </td>

                <td className="px-2 sm:px-4 py-4">{s.email}</td>
                <td className="px-2 sm:px-4 py-4">{s.course}</td>
                <td className="px-2 sm:px-4 py-4">{s.university}</td>

                <td className="px-2 sm:px-4 py-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs">
                    {s.status}
                  </span>
                </td>

                <td className="px-2 sm:px-4 py-4">
                  <span className="bg-gray-600 text-white px-3 py-1 rounded-lg text-xs">
                    {s.application}
                  </span>
                </td>

                <td className="px-2 sm:px-4 py-4">{s.counselor}</td>

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
            {students.map((s) => (
              <MobileCard
                key={s.id}
                title={s.name}
                fields={[
                  { label: "Email", value: s.email },
                  { label: "Course", value: s.course },
                  { label: "University", value: s.university },
                  { label: "Status", value: s.status },
                  { label: "Application", value: s.application },
                  { label: "Counselor", value: s.counselor },
                ]}
                actions={[
                  {
                    label: "View",
                    className: "text-blue-400 text-sm",
                    onClick: () => console.log("View", s),
                  },
                  {
                    label: "Edit",
                    className: "text-blue-400 text-sm",
                    onClick: () => console.log("Edit", s),
                  },
                  {
                    label: "Delete",
                    className: "text-red-400 text-sm",
                    onClick: () => console.log("Delete", s),
                  },
                ]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Add Student Modal */}
      <FormModal
        id="add_student_modal"
        title="Add Student"
        fields={studentFields}
        onSave={handleAddStudent}
      />
    </div>
  );
};

export default Students;
