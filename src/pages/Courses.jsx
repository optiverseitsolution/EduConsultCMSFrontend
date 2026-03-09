import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import { Plus } from "lucide-react";
import FormModal from "../components/modal/FormModal";
import ViewModal from "../components/modal/ViewModal";
import SeacrhModal from "../components/modal/SeacrhModal";
import UpdateModal from "../components/modal/UpdateModal";
import {
  registerCourse,
  getAllCourse,
  updateCourse,
  deleteCourse,
  updateCourseStatus,
} from "../api/courseService";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [search, setSearch] = useState("");

  const headers = [
    "Course Name",
    "Level",
    "Field",
    "Duration",
    "Intake",
    "Country",
    "University",
    "Tuition Fee",
    "Status",
    "Actions",
  ];

  const courseFields = [
    { name: "course_name", label: "Course Name", placeholder: "BSc IT" },
    {
      name: "level",
      label: "Level",
      type: "select",
      options: ["Bachelor", "Master"],
    },
    { name: "field", label: "Field", placeholder: "IT" },
    {
      name: "duration",
      label: "Duration",
      placeholder: "3 Years",
      type: "number",
      min: "0",
    },
    { name: "intake", label: "Intake", placeholder: "Jan, Sep" },
    { name: "country", label: "Country", placeholder: "Australia" },
    {
      name: "university",
      label: "University",
      placeholder: "Sydney University",
    },
    {
      name: "tuition_fee",
      label: "Tuition Fee",
      placeholder: "$15,000/year",
      type: "number",
      min: "0",
    },
  ];

  const handleAddCourse = async (newCourse) => {
    try {
      const payload = {
        ...newCourse,
        status: newCourse.status === "Active" ? "1" : "0",
      };

      const created = await registerCourse(payload);

      const formattedStudent = {
        id: created.id,
        course_name: created.course_name,
        level: created.level,
        field: created.field,
        duration: created.duration,
        intake: created.intake,
        country: created.country,
        university: created.university,
        tuition_fee: created.tuition_fee,
        status:
          created.status === 0 || created.status === "0"
            ? "Inactive"
            : "Active",
      };

      setCourses((prev) => [...prev, formattedStudent]);
      setSuccess("Course Created");
      setError("");
    } catch (err) {
      setError("Error creating student.");
      throw err;
    }
  };

  // search
  const filteredCourses = courses.filter((course) =>
    Object.values(course)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // get
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await getAllCourse();
        const formattedCourse = course.map((item) => ({
          id: item.id,
          course_name: item.course_name,
          level: item.level,
          field: item.field,
          duration: item.duration,
          intake: item.intake,
          country: item.country,
          university: item.university,
          tuition_fee: Math.trunc(item.tuition_fee),
          status:
            item.status === 0 || item.status === "0" ? "Inactive" : "Active",
        }));
        setCourses(formattedCourse);
      } catch (err) {
        throw err;
      }
    };
    fetchCourse();
  }, []);

  // update
  const handleEditCourse = async (updatedData) => {
    if (!selectedCourse?.id) {
      setError("Missing ID");
      return;
    }

    try {
      const payload = {
        ...updatedData,
        status: updatedData.status === "Active" ? "1" : "0",
      };

      const updated = await updateCourse(payload);

      setCourses((prev) =>
        prev.map((course) =>
          course.id === selectedCourse.id
            ? {
                id: updated.id,
                course_name: updated.course_name,
                level: updated.level,
                field: updated.field,
                duration: updated.duration,
                intake: updated.intake,
                country: updated.country,
                university: updated.university,
                tuition_fee: Math.trunc(updated.tuition_fee),
                status:
                  updated.status === "0" || updated.status === "0"
                    ? "Inactive"
                    : "Active",
              }
            : course,
        ),
      );

      document.getElementById("update_course_modal").close();
      setSelectedCourse(null);
      setSuccess("User Updated Successfully");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  // delete
  const handleDeletCourse = async (course) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await deleteCourse({ id: course.id });
      setCourses((prev) => prev.filter((c) => c.id !== course.id));
    } catch (err) {
      alert("Failed to delete Course. Please try again.");
    }
  };

  //update status
  const handleToggleStatus = async (courseId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? 0 : 1;
      await updateCourseStatus(courseId, newStatus);

      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId
            ? { ...c, status: newStatus === 1 ? "Active" : "Inactive" }
            : c,
        ),
      );
      setSuccess("Status updated");
      setError("");
    } catch (err) {
      setError("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Courses / Programs</h1>
          <p className="text-gray-400">Manage course offerings and programs</p>
        </div>
        <button
          onClick={() =>
            document.getElementById("add_course_modal").showModal()
          }
          className="flex flex-row gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto hover:cursor-pointer"
        >
          <Plus size={18} /> Add Course
        </button>
      </div>

      <div className="rounded-lg p-4 sm:p-6 border border-gray-400">
        <h2 className="text-lg font-semibold mb-2">All Courses</h2>
        <p className="text-gray-400 text-sm mb-4">
          Browse and manage available courses and programs
        </p>
        {/* Search Bar */}

        <SeacrhModal
          placeholder="courses"
          value={search}
          onChange={setSearch}
        />

        {error && <span className="text-red-500">{error}</span>}

        {success && <span className="text-green-500">{success}</span>}

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            headers={headers}
            data={filteredCourses}
            renderRow={(course) => (
              <tr
                key={course.id}
                className="border-b border-gray-700 hover:bg-base-300"
              >
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {course.course_name}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {course.level}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {course.field}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {course.duration} Years
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {course.intake}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {course.country}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {course.university}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  ${course.tuition_fee}/year
                </td>
                <td className="px-2 sm:px-4 py-4">
                  <button
                    onClick={() => handleToggleStatus(course.id, course.status)}
                    className={`${
                      course.status === "Active"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-600 hover:bg-gray-700"
                    } text-white px-3 py-1 rounded-lg text-xs transition-colors`}
                  >
                    {course.status}
                  </button>
                </td>
                <td className="px-2 sm:px-4 py-4">
                  <div className="flex gap-2 sm:gap-4 text-xs sm:text-base">
                    <button
                      className="hover:text-blue-300 hover:cursor-pointer"
                      onClick={() => {
                        setSelectedCourse(course);
                        document
                          .getElementById("view_course_modal")
                          .showModal();
                      }}
                    >
                      View
                    </button>

                    <button
                      className="hover:text-blue-300"
                      onClick={() => {
                        setSelectedCourse(course);
                        document
                          .getElementById("update_course_modal")
                          .showModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:text-red-300"
                      onClick={() => handleDeletCourse(course)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )}
          />
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {courses.map((course) => (
              <MobileCard
                key={course.id}
                title={course.course_name}
                fields={[
                  { label: "Level", value: course.level },
                  { label: "Field", value: course.field },
                  { label: "Duration", value: `${course.duration} Years` },
                  { label: "Country", value: course.country },
                  { label: "University", value: course.university },
                  { label: "Fee", value: `$${course.tuition_fee}` },
                ]}
                actions={[
                  {
                    label: "View",
                    className: "text-blue-400 text-sm",
                    onClick: () => {
                      setSelectedCourse(course);
                      document.getElementById("view_course_modal").showModal();
                    },
                  },
                  {
                    label: "Edit",
                    className: "text-blue-400 text-sm",
                    onClick: () => {
                      setSelectedCourse(course);
                      document
                        .getElementById("update_course_modal")
                        .showModal();
                    },
                  },
                  {
                    label: "Delete",
                    className: "text-red-400 text-sm",
                    onClick: () => handleDeletCourse(course),
                  },
                ]}
              />
            ))}
          </div>
        </div>
      </div>
      <FormModal
        id="add_course_modal"
        title="Add Course"
        fields={courseFields}
        onSave={handleAddCourse}
      />
      <ViewModal
        id="view_course_modal"
        title="Course"
        fields={courseFields}
        data={selectedCourse}
      />
      <UpdateModal
        id="update_course_modal"
        title="Edit Course"
        fields={courseFields}
        data={selectedCourse}
        onSave={handleEditCourse}
      />
    </div>
  );
};

export default Courses;
