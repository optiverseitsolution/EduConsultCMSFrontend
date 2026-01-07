import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Courses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "BSc Information Technology",
      level: "Bachelor",
      field: "IT",
      duration: "3 Years",
      intake: "Jan, Sep",
      country: "Australia",
      university: "Sydney University",
      tuitionFee: "$15,000/year",
      status: "Active",
    },
    {
      id: 2,
      name: "MSc Computer Science",
      level: "Master",
      field: "IT",
      duration: "2 Years",
      intake: "Feb, Sep",
      country: "UK",
      university: "Oxford University",
      tuitionFee: "$25,000/year",
      status: "Active",
    },
    {
      id: 3,
      name: "MBA Business Administration",
      level: "Master",
      field: "Business",
      duration: "2 Years",
      intake: "Sep",
      country: "USA",
      university: "Stanford University",
      tuitionFee: "$45,000/year",
      status: "Active",
    },
  ]);

  return (
    <div className="flex bg-black min-h-screen">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl text-white font-bold">
              Courses / Programs
            </h1>
            <p className="text-gray-400">
              Manage course offerings and programs
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
            + Add Course
          </button>
        </div>

        {/* All Courses Section */}
        <div className="bg-[#0B0F14] rounded-lg p-6">
          <h2 className="text-lg text-white font-semibold mb-4">All Courses</h2>
          <p className="text-gray-400 text-sm mb-4">
            Browse and manage available courses and programs
          </p>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search courses..."
                className="w-full text-white pl-10 pr-2 py-2 rounded-lg 
               border border-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-300">
              <thead>
                <tr className="border-b border-gray-700 text-left font-bold">
                  <th className="px-4 py-3">Course Name</th>
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3">Field</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Intake</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">University</th>
                  <th className="px-4 py-3">Tuition Fee</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course.id}
                    className="border-b border-gray-700 hover:bg-gray-800 "
                  >
                    <td className="px-4 py-4">{course.name}</td>
                    <td className="px-4 py-4">{course.level}</td>
                    <td className="px-4 py-4">{course.field}</td>
                    <td className="px-4 py-4">{course.duration}</td>
                    <td className="px-4 py-4">{course.intake}</td>
                    <td className="px-4 py-4">{course.country}</td>
                    <td className="px-4 py-4">{course.university}</td>
                    <td className="px-4 py-4">{course.tuitionFee}</td>
                    <td className="px-4 py-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium">
                        {course.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-4">
                        <button className=" hover:text-blue-300 font-medium">
                          View
                        </button>
                        <button className=" hover:text-blue-300 font-medium">
                          Edit
                        </button>
                        <button className=" hover:text-red-300 font-medium">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
