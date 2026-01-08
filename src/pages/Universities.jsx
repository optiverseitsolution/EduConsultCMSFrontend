import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import oxford from "../assets/logos/oxford.png";
import MobileCard from "../components/MobileCard";

const Universities = () => {
  const [universities, setUniversities] = useState([
    {
      id: 1,
      logo: oxford,
      name: "Oxford University",
      country: "UK",
      city: "Oxford",
      partnerType: "Partner",
      programs: 45,
      applicationFee: 50,
      status: "Active",
    },
    {
      id: 2,
      logo: oxford,
      name: "Sydney University",
      country: "Australia",
      city: "Sydney",
      partnerType: "Partner",
      programs: 38,
      applicationFee: 0,
      status: "Active",
    },
    {
      id: 3,
      logo: oxford,
      name: "Stanford University",
      country: "USA",
      city: "Stanford",
      partnerType: "Non-Partner",
      programs: 52,
      applicationFee: 75,
      status: "Active",
    },
  ]);

  const headers = [
    "Logo",
    "University Name",
    "Country",
    "City",
    "Partner Type",
    "Programs",
    "Application Fee",
    "Status",
    "Actions",
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl text-white font-bold">
            Universities / Programs
          </h1>
          <p className="text-gray-400">
            Manage partner and non-partner institutions
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto">
          + Add University
        </button>
      </div>

      <div className="bg-[#0B0F14] rounded-lg p-4 sm:p-6">
        <h2 className="text-lg text-white font-semibold mb-2">
          All Universities
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          View and manage university partnerships
        </p>
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search universities..."
              className="w-full bg-[#0B0F14] text-white pl-10 pr-2 py-2 rounded-lg 
border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            headers={headers}
            data={universities}
            renderRow={(university) => (
              <tr
                key={university.id}
                className="border-b border-gray-700 hover:bg-gray-800"
              >
                <td className="px-2 sm:px-4 ">
                  <img
                    src={university.logo}
                    alt={university.name}
                    className="w-8 rounded-lg object-cover"
                  />
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {university.name}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {university.country}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {university.city}
                </td>
                <td className="px-2 sm:px-4 py-4">
                  {university.partnerType === "Partner" ? (
                    <p className="bg-blue-600 rounded-lg w-fit px-3 py-1 text-xs">
                      {university.partnerType}
                    </p>
                  ) : (
                    <p className="bg-gray-600 rounded-lg w-fit px-3 py-1 text-xs">
                      {university.partnerType}
                    </p>
                  )}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {university.programs}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  ${university.applicationFee}
                </td>

                <td className="px-2 sm:px-4 py-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs">
                    {university.status}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-4">
                  <div className="flex gap-2 sm:gap-4 text-xs sm:text-base">
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
            {universities.map((uni) => (
              <MobileCard
                key={uni.id}
                title={uni.name}
                image={uni.logo}
                fields={[
                  { label: "Country", value: uni.country },
                  { label: "City", value: uni.city },
                  { label: "Programs", value: uni.programs },
                  { label: "Application Fee", value: `$${uni.applicationFee}` },
                  {
                    label: "Partner",
                    value:
                      uni.partnerType === "Partner" ? (
                        <span className="bg-blue-600 rounded-lg w-fit px-2 py-1 text-xs">
                          {uni.partnerType}
                        </span>
                      ) : (
                        <span className="bg-gray-600 rounded-lg w-fit px-2 py-1 text-xs">
                          {uni.partnerType}
                        </span>
                      ),
                  },
                ]}
                actions={[
                  {
                    label: "View",
                    className: "text-blue-400 text-sm",
                    onClick: () => console.log("View", uni),
                  },
                  {
                    label: "Edit",
                    className: "text-blue-400 text-sm",
                    onClick: () => console.log("Edit", uni),
                  },
                  {
                    label: "Delete",
                    className: "text-red-400 text-sm",
                    onClick: () => console.log("Delete", uni),
                  },
                ]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Universities;
