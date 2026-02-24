import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import FormModal from "../components/modal/FormModal";
import UpdateModal from "../components/modal/UpdateModal";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  updateStudentStatus,
} from "../api/authService";

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
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  const studentFields = [
    { name: "student", label: "Student Name", placeholder: "Enter student name", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "student@example.com", required: true },
    { name: "profile_image", label: "Profile Image", type: "file", accept: "image/*" },
    { name: "course", label: "Course", placeholder: "e.g., BSc IT, MSc CS", required: true },
    { name: "applied_university", label: "Applied University", placeholder: "Enter university name", required: true },
    { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"], required: true },
    { name: "application", label: "Application Status", type: "select", options: ["Approved", "Pending", "Under Review"], required: true },
    { name: "counselor", label: "Counselor Name", placeholder: "Enter counselor name", required: true },
  ];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getStudents();
      setStudents(response.data.data || []);
    } catch (error) {
      console.error("Failed to load students:", error);
      alert("Failed to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (newStudent) => {
    try {
      const studentData = {
        ...newStudent,
        status: newStudent.status === "Active" ? "1" : "0",
      };
      await createStudent(studentData);
      await fetchStudents();
      document.getElementById("add_student_modal").close();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student. Please try again.");
    }
  };

  const handleEditClick = (student) => {
    // ✅ Map the student data to match field names, including status boolean -> string
    setEditingStudent({
      ...student,
      status: student.status === true || student.status === 1 || student.status === "1"
        ? "Active"
        : "Inactive",
    });
    document.getElementById("edit_student_modal").showModal();
  };

  const handleUpdateStudent = async (updatedData) => {
    try {
      const studentData = {
        ...updatedData,
        status: updatedData.status === "Active" ? "1" : "0",
      };
      await updateStudent(editingStudent.id, studentData);
      await fetchStudents();
      document.getElementById("edit_student_modal").close();
      setEditingStudent(null);
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student. Please try again.");
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await deleteStudent(studentId);
      await fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student. Please try again.");
    }
  };

  const handleToggleStatus = async (studentId, currentStatus) => {
    try {
      const newStatus = currentStatus ? "0" : "1";
      await updateStudentStatus(studentId, newStatus);
      await fetchStudents();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.student?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.course?.toLowerCase().includes(searchLower) ||
      student.applied_university?.toLowerCase().includes(searchLower) ||
      student.counselor?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Students Management</h1>
          <p className="text-gray-400">Track and manage student applications</p>
        </div>
        <button
          onClick={() => document.getElementById("add_student_modal").showModal()}
          className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      <div className="rounded-lg p-4 sm:p-6 border border-gray-400">
        <h2 className="text-lg font-semibold mb-2">All Students</h2>
        <p className="text-gray-400 text-sm mb-4">View and manage all registered students</p>

        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-2 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-full mb-4"></div>
              <div className="h-8 bg-gray-700 rounded w-full mb-4"></div>
              <div className="h-8 bg-gray-700 rounded w-full mb-4"></div>
            </div>
            <p className="text-gray-400 mt-4">Loading students...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">
              {searchTerm ? "No students found matching your search" : "No students found"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    {headers.map((h, i) => (
                      <th key={i} className="px-2 sm:px-4 py-3 text-left text-sm font-medium text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s, index) => (
                    <tr key={s.id} className="border-b border-gray-700 hover:bg-base-300">
                      <td className="px-2 sm:px-4 py-4">{index + 1}</td>
                      <td className="px-2 sm:px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={s.profile_image || `https://ui-avatars.com/api/?name=${s.student}&background=random`}
                            alt={s.student}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span>{s.student}</span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-4">{s.email}</td>
                      <td className="px-2 sm:px-4 py-4">{s.course}</td>
                      <td className="px-2 sm:px-4 py-4">{s.applied_university}</td>
                      <td className="px-2 sm:px-4 py-4">
                        <button
                          onClick={() => handleToggleStatus(s.id, s.status)}
                          className={`${s.status ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"} text-white px-3 py-1 rounded-lg text-xs transition-colors`}
                        >
                          {s.status ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-2 sm:px-4 py-4">
                        <span className={`px-3 py-1 rounded-lg text-xs ${s.application === "Pending" ? "bg-gray-600 text-white" : "bg-blue-600 text-white"}`}>
                          {s.application}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-4">{s.counselor}</td>
                      <td className="px-2 sm:px-4 py-4">
                        <div className="flex gap-3 text-sm">
                          <button onClick={() => handleEditClick(s)} className="hover:text-blue-300 transition-colors">Edit</button>
                          <button onClick={() => handleDeleteStudent(s.id)} className="hover:text-red-300 transition-colors">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {filteredStudents.map((s) => (
                <MobileCard
                  key={s.id}
                  title={s.student}
                  fields={[
                    { label: "Email", value: s.email },
                    { label: "Course", value: s.course },
                    { label: "University", value: s.applied_university },
                    { label: "Status", value: s.status ? "Active" : "Inactive" },
                    { label: "Application", value: s.application },
                    { label: "Counselor", value: s.counselor },
                  ]}
                  actions={[
                    { label: "Edit", className: "text-blue-400 text-sm", onClick: () => handleEditClick(s) },
                    { label: "Delete", className: "text-red-400 text-sm", onClick: () => handleDeleteStudent(s.id) },
                  ]}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add Student Modal */}
      <FormModal
        id="add_student_modal"
        title="Add Student"
        fields={studentFields}
        onSave={handleAddStudent}
      />

      {/* ✅ Edit Student Modal — using UpdateModal just like Universities page */}
      <UpdateModal
        id="edit_student_modal"
        title="Edit Student"
        fields={studentFields}
        data={editingStudent}
        onSave={handleUpdateStudent}
      />
    </div>
  );
};

export default Students;