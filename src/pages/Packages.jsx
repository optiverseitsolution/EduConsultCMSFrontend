import React, { useState } from "react";
import { Plus } from "lucide-react";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import PackageFormModal from "../components/modal/PackageFormModal";
import ViewModal from "../components/modal/ViewModal";
import SeacrhModal from "../components/modal/SeacrhModal";

const Packages = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      image: null,
      gallery: [],
      name: "Everest Base Camp Trek",
      difficulty: "Moderate",
      size: 10,
      duration: "12 Days",
      overview:
        "An unforgettable trek to the base of the world's highest mountain.",
      highlights: "• Scenic mountain views\n• Local culture experience",
      itinerary: "<p>Day 1: Arrival in Kathmandu...</p>",
      status: "Active",
    },
    {
      id: 2,
      image: null,
      gallery: [],
      name: "Annapurna Circuit",
      difficulty: "Challenging",
      size: 12,
      duration: "18 Days",
      overview: "Complete circuit trek around Annapurna range.",
      highlights: "• Himalayan panorama\n• Traditional villages",
      itinerary: "<p>Day 1: Arrival in Pokhara...</p>",
      status: "Active",
    },
  ]);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [search, setSearch] = useState("");

  const filteredPackages = packages.filter((p) =>
    Object.values(p).join(" ").toLowerCase().includes(search.toLowerCase()),
  );

  const headers = [
    "Name",
    "Difficulty",
    "Max Group Size",
    "Duration",
    "Status",
    "Actions",
  ];

  const packageFields = [
    {
      name: "image",
      label: "Featured Image Upload",
      type: "file",
      placeholder: "",
    },
    {
      name: "gallery",
      label: "Gallery",
      type: "file-multiple",
      placeholder: "",
    },
    {
      name: "name",
      label: "Package Name",
      placeholder: "Everest Base Camp Trek",
    },
    {
      name: "difficulty",
      label: "Difficulty",
      type: "select",
      options: ["Easy", "Moderate", "Challenging"],
    },
    {
      name: "size",
      label: "Max Group Size",
      type: "number",
      placeholder: "10",
      min: "1",
    },
    {
      name: "duration",
      label: "Duration",
      placeholder: "12 Days",
    },
    {
      name: "overview",
      label: "Tour Overview",
      type: "textarea",
      placeholder: "A brief summary of the tour",
      rows: "3",
    },
    {
      name: "highlights",
      label: "Highlights",
      type: "textarea",
      placeholder: "• Highlight 1\n• Highlight 2",
      rows: "3",
    },
    {
      name: "itinerary",
      label: "Detailed Itinerary",
      type: "richtext",
      placeholder: "<p>Day 1: Arrival...</p>",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
  ];

  const handleAddPackage = (newPackage) => {
    setPackages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        status: "Active",
        ...newPackage,
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Packages</h1>
          <p className="text-gray-400">Manage packages</p>
        </div>
        <button
          onClick={() =>
            document.getElementById("add_package_modal").showModal()
          }
          className="flex flex-row gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto hover:cursor-pointer"
        >
          <Plus size={18} /> Add package
        </button>
      </div>

      {/* Packages Table */}
      <div className="rounded-lg p-4 sm:p-6 border border-gray-400">
        <h2 className="text-lg font-semibold mb-2">All Packages</h2>
        <p className="text-gray-400 text-sm mb-4">
          Browse and manage available packages
        </p>

        {/* Search */}
        <SeacrhModal
          placeholder="packages"
          value={search}
          onChange={setSearch}
        />

        <div className="overflow-x-auto">
          <Table
            headers={headers}
            data={filteredPackages}
            renderRow={(p) => (
              <tr key={p.id} className="border-b border-gray-700">
                <td className="px-2 sm:px-4 py-4">{p.name}</td>
                <td className="px-2 sm:px-4 py-4">{p.difficulty}</td>
                <td className="px-2 sm:px-4 py-4">{p.size}</td>
                <td className="px-2 sm:px-4 py-4">{p.duration}</td>
                <td className="px-2 sm:px-4 py-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs">
                    {p.status}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-4">
                  <div className="flex gap-2 sm:gap-4 text-xs sm:text-base">
                    <button
                      className="hover:text-blue-300"
                      onClick={() => {
                        setSelectedPackage(p);
                        document
                          .getElementById("view_package_modal")
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
          <div className="md:hidden space-y-4 mt-4">
            {filteredPackages.map((p) => (
              <MobileCard
                key={p.id}
                title={p.name}
                fields={[
                  { label: "Difficulty", value: p.difficulty },
                  { label: "Max Group Size", value: p.size },
                  { label: "Duration", value: p.duration },
                  { label: "Status", value: p.status },
                ]}
                actions={[
                  {
                    label: "View",
                    className: "text-blue-400 text-sm",
                    onClick: () => {
                      setSelectedPackage(p);
                      document.getElementById("view_package_modal").showModal();
                    },
                  },
                  {
                    label: "Edit",
                    className: "text-blue-400 text-sm",
                    onClick: () => console.log("Edit", p),
                  },
                  {
                    label: "Delete",
                    className: "text-red-400 text-sm",
                    onClick: () => console.log("Delete", p),
                  },
                ]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <PackageFormModal id="add_package_modal" onSave={handleAddPackage} />
      {/* <ViewModal
        id="view_package_modal"
        title="Package"
        feilds={packageFields}
        data={selectedPackage}
      /> */}
    </div>
  );
};

export default Packages;
