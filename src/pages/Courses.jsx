import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import { Plus } from "lucide-react";
import FormModal from "../components/modal/FormModal";
import ViewModal from "../components/modal/ViewModal";
import SeacrhModal from "../components/modal/SeacrhModal";

const Courses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "BSc Information Technology",
      level: "Bachelor",
      field: "IT",
      duration: "3",
      intake: "Jan, Sep",
      country: "Australia",
      university: "Sydney University",
      tuitionFee: "15,000",
      status: "Active",
    },
    {
      id: 2,
      name: "MSc Computer Science",
      level: "Master",
      field: "IT",
      duration: "2",
      intake: "Feb, Sep",
      country: "UK",
      university: "Oxford University",
      tuitionFee: "25,000",
      status: "Active",
    },
    {
      id: 3,
      name: "MBA Business Administration",
      level: "Master",
      field: "Business",
      duration: "2",
      intake: "Sep",
      country: "USA",
      university: "Stanford University",
      tuitionFee: "45,000",
      status: "Active",
    },
  ]);

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
    { name: "name", label: "Course Name", placeholder: "BSc IT" },
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
      name: "tuitionFee",
      label: "Tuition Fee",
      placeholder: "$15,000/year",
      type: "number",
      min: "0",
    },
  ];

  const handleAddCourse = (newCourse) => {
    setCourses((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        status: "Active",
        ...newCourse,
      },
    ]);
  };

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter((course) =>
    Object.values(course).join(" ").toLowerCase().includes(search.toLowerCase())
  );

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
        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            headers={headers}
            data={filteredCourses}
            renderRow={(course) => (
              <tr key={course.id} className="border-b border-gray-700 ">
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {course.name}
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
                  ${course.tuitionFee}/year
                </td>
                <td className="px-2 sm:px-4 py-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs">
                    {course.status}
                  </span>
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

                    <button className="hover:text-blue-300">Edit</button>
                    <button className="hover:text-red-300">Delete</button>
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
                title={course.name}
                fields={[
                  { label: "Level", value: course.level },
                  { label: "Field", value: course.field },
                  { label: "Duration", value: course.duration },
                  { label: "Country", value: course.country },
                  { label: "University", value: course.university },
                  { label: "Fee", value: course.tuitionFee },
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
                    onClick: () => console.log("Edit", course),
                  },
                  {
                    label: "Delete",
                    className: "text-red-400 text-sm",
                    onClick: () => console.log("Delete", course),
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
    </div>
  );
};

export default Courses;
