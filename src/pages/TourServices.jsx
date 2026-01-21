import React, { useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import FormModal from "../components/modal/FormModal";

const headers = [
  "Service Name",
  "Category",
  "Duration",
  "Price per Person",
  "Status",
  "Actions",
];

const TourServices = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Safari Adventure",
      category: "Wildlife",
      duration: "5 Days",
      price: "$1,200",
      status: "Active",
    },
    {
      id: 2,
      name: "Luxury Nile Cruise",
      category: "Luxury",
      duration: "8 Days",
      price: "$2,500",
      status: "Active",
    },
    {
      id: 3,
      name: "Cultural Kyoto Tour",
      category: "Cultural",
      duration: "7 Days",
      price: "$1,800",
      status: "Active",
    },
    {
      id: 4,
      name: "Himalayan Trek",
      category: "Adventure",
      duration: "12 Days",
      price: "$3,000",
      status: "Active",
    },
  ]);

  /** 🔹 Modal Fields for Tour Services */
  const serviceFields = [
    { name: "name", label: "Service Name", placeholder: "e.g. Safari Adventure" },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: ["Wildlife", "Luxury", "Cultural", "Adventure"],
    },
    { name: "duration", label: "Duration", placeholder: "e.g. 5 Days" },
    { name: "price", label: "Price per Person", placeholder: "$1,200" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
  ];

  /** 🔹 Add Service Handler */
  const handleAddService = (newService) => {
    setServices((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newService,
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tour Services</h1>
          <p className="text-gray-400">
            Manage tour packages and travel services
          </p>
        </div>

        <button
          onClick={() => document.getElementById("add_service_modal").showModal()}
          className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto transition-colors"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Main Content Card */}
      <div className="rounded-lg p-4 sm:p-6 border border-gray-700 bg-base-100">
        <h2 className="text-lg font-semibold mb-2">All Services</h2>
        <p className="text-gray-400 text-sm mb-4">
          View and manage all registered tour packages
        </p>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-transparent focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table View (Hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <Table
            headers={headers}
            data={services}
            renderRow={(item, index) => (
              <tr key={item.id} className="border-b border-gray-700 hover:bg-base-300 transition-colors">
                <td className="px-4 py-4 font-medium">{item.name}</td>
                <td className="px-4 py-4">{item.category}</td>
                <td className="px-4 py-4">{item.duration}</td>
                <td className="px-4 py-4 font-semibold">{item.price}</td>
                <td className="px-4 py-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                    {item.status}
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
        </div>

        {/* Mobile View (Hidden on desktop) */}
        <div className="md:hidden space-y-4">
          {services.map((item) => (
            <MobileCard
              key={item.id}
              title={item.name}
              fields={[
                { label: "Category", value: item.category },
                { label: "Duration", value: item.duration },
                { label: "Price", value: item.price },
                { label: "Status", value: item.status },
              ]}
              actions={[
                {
                  label: "View",
                  className: "text-blue-400 text-sm",
                  onClick: () => console.log("View", item),
                },
                {
                  label: "Edit",
                  className: "text-blue-400 text-sm",
                  onClick: () => console.log("Edit", item),
                },
                {
                  label: "Delete",
                  className: "text-red-400 text-sm",
                  onClick: () => console.log("Delete", item),
                },
              ]}
            />
          ))}
        </div>
      </div>

      {/* 🔹 Add Service Modal (Using your FormModal) */}
      <FormModal
        id="add_service_modal"
        title="Add New Tour Service"
        fields={serviceFields}
        onSave={handleAddService}
      />
    </div>
  );
};

export default TourServices;