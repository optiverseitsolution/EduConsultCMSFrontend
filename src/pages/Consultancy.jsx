import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import abc from "../assets/logos/abc.jpg";
import { Plus } from "lucide-react";
import FormModal from "../components/modal/FormModal";

const Consultancy = () => {
  const [consultancies, setConsultancies] = useState([
    {
      id: 1,
      logo: abc,
      name: "ABC Education Consultancy",
      email: "contact@abcedu.com",
      phone: "+1-234-567-8900",
      country: "USA",
      serviceFee: 500,
      currency: "USD",
      students: 245,
      status: "Active",
    },
    {
      id: 2,
      logo: abc,
      name: "Global Study Partners",
      email: "info@globalstudy.com",
      phone: "+44-20-1234-5678",
      country: "UK",
      serviceFee: 400,
      currency: "GBP",
      students: 189,
      status: "Active",
    },
  ]);

  const headers = [
    "Logo",
    "Consultancy Name",
    "Email",
    "Phone",
    "Country",
    "Service Fee",
    "Currency",
    "Students",
    "Status",
    "Actions",
  ];

  const consultancyFields = [
    {
      name: "logo",
      label: "Logo",
      type: "file",
    },
    {
      name: "name",
      label: "Consultancy Name",
      placeholder: "Global Study Partners",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "info@globalstudy.com",
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "+44-20-1234-5678",
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: ["UK", "USA", "Australia", "Canada", "Germany"],
    },
    {
      name: "serviceFee",
      label: "Service Fee",
      type: "number",
      placeholder: "400",
    },
    {
      name: "currency",
      label: "Currency",
      type: "select",
      options: ["GBP", "USD", "AUD", "EUR"],
    },
    {
      name: "students",
      label: "Students Enrolled",
      type: "number",
      placeholder: "189",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
  ];
  const handleAddConsultancy = (newConsultancy) => {
    setConsultancies((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        status: "Active",
        ...newConsultancy,
      },
    ]);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Consultancy</h1>
          <p className="text-gray-400">
            Manage consultancy information and services
          </p>
        </div>
        <button
          onClick={() =>
            document.getElementById("add_consultancy_modal").showModal()
          }
          className="flex flex-row gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto"
        >
          <Plus size={18} /> Add Consultancy
        </button>
      </div>

      <div className="rounded-lg p-4 sm:p-6 border border-gray-400">
        <h2 className="text-lg  font-semibold mb-2">All consultancies</h2>
        <p className="text-gray-400 text-sm mb-4">
          View and manage consultancy partnerships
        </p>
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search consultancies..."
              className="w-full pl-10 pr-2 py-2 rounded-lg 
border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            headers={headers}
            data={consultancies}
            renderRow={(c) => (
              <tr
                key={c.id}
                className="border-b border-gray-700 hover:bg-gray-800"
              >
                <td className="px-2 sm:px-4 ">
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="w-8 rounded-lg object-cover"
                  />
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {c.name}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {c.email}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {c.phone}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {c.country}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  ${c.serviceFee}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {c.currency}
                </td>
                <td className="px-2 sm:px-4 py-4 text-sm sm:text-base">
                  {c.students}
                </td>

                <td className="px-2 sm:px-4 py-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs">
                    {c.status}
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
            {consultancies.map((c) => (
              <MobileCard
                key={c.id}
                title={c.name}
                image={c.logo}
                fields={[
                  { label: "Email", value: c.level },
                  { label: "Phone", value: c.phone },
                  { label: "Country", value: c.country },
                  { label: "Service Fee", value: `$${c.serviceFee}` },
                  { label: "Currency", value: c.currency },
                  { label: "Students", value: c.students },
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
      <FormModal
        id="add_consultancy_modal"
        title="Add Consultancy"
        fields={consultancyFields}
        onSave={handleAddConsultancy}
      />
    </div>
  );
};

export default Consultancy;
