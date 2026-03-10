import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import { Plus } from "lucide-react";
import FormModal from "../components/modal/FormModal";
import ViewModal from "../components/modal/ViewModal";
import SeacrhModal from "./../components/modal/SeacrhModal";
import UpdateModal from "../components/modal/UpdateModal";
import {
  getAllConsultancies,
  registerConsultancy,
  updateConsultancy,
  deleteConsultancy,
} from "../api/consultancyService";

const Consultancy = () => {
  const [consultancies, setConsultancies] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedConsultancy, setSelectedConsultancy] = useState(null);
  const [editingConsultancy, setEditingConsultancy] = useState(null);

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
    { name: "logo", label: "Logo", type: "file" },
    {
      name: "consultancy_name",
      label: "Consultancy Name",
      placeholder: "Global Study Partners",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "info@globalstudy.com",
    },
    { name: "phone", label: "Phone Number", placeholder: "+44-20-1234-5678" },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: ["UK", "USA", "Australia", "Canada", "Germany"],
    },
    {
      name: "service_fee",
      label: "Service Fee",
      type: "number",
      placeholder: "400",
      min: "0",
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
      min: "0",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
  ];

  // ✅ Handles ALL formats the API returns:
  // GET all  → status: false / true  (boolean)
  // GET single / PUT response → status: "0" / "1"  (string)
  // Active = false / "0" / 0
  // Inactive = true / "1" / 1
  const isActive = (status) => {
    if (status === false || status === "false") return true; // boolean false = Active
    if (status === true || status === "true") return false; // boolean true  = Inactive
    return String(status) === "0"; // "0" = Active, "1" = Inactive
  };

  // Map any status value → "Active" or "Inactive" label for the dropdown
  const mapStatusToLabel = (status) =>
    isActive(status) ? "Active" : "Inactive";

  // Map dropdown label → "0"/"1" string the API expects on POST/PUT
  const mapStatusToValue = (status) => {
    if (status === "Active") return "0";
    if (status === "Inactive") return "1";
    return status;
  };

  // GET ALL
  useEffect(() => {
    const fetchConsultancies = async () => {
      try {
        const data = await getAllConsultancies();
        setConsultancies(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError("Could not load consultancies.");
      }
    };
    fetchConsultancies();
  }, []);

  // POST
  const handleAddConsultancy = async (newConsultancyData) => {
    try {
      const formData = new FormData();
      Object.keys(newConsultancyData).forEach((key) => {
        const value =
          key === "status"
            ? mapStatusToValue(newConsultancyData[key])
            : newConsultancyData[key];
        formData.append(key, value);
      });

      const created = await registerConsultancy(formData);
      setConsultancies((prev) => [...prev, created]);
      setSuccess("Consultancy added successfully!");
      setError("");
      document.getElementById("add_consultancy_modal").close();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong adding it");
    }
  };

  // Open edit modal — convert status to label for dropdown, stored in separate state
  const handleEditClick = (c) => {
    setEditingConsultancy({
      ...c,
      status: mapStatusToLabel(c.status),
    });
    document.getElementById("update_c_modal").showModal();
  };

  // PUT
  const handleEditConsultancy = async (updatedData) => {
    if (!editingConsultancy?.id) return;

    try {
      const formData = new FormData();
      formData.append("_method", "PUT");

      const fieldsToUpdate = [
        "consultancy_name",
        "email",
        "phone",
        "country",
        "service_fee",
        "currency",
        "students",
        "status",
      ];

      fieldsToUpdate.forEach((key) => {
        const value =
          key === "status"
            ? mapStatusToValue(updatedData[key] ?? "")
            : (updatedData[key] ?? "");
        formData.append(key, value);
      });

      if (updatedData.logo instanceof File) {
        formData.append("logo", updatedData.logo);
      }

      const updatedEntry = await updateConsultancy(
        editingConsultancy.id,
        formData,
      );

      setConsultancies((prev) =>
        prev.map((c) => (c.id === editingConsultancy.id ? updatedEntry : c)),
      );

      setSuccess("Consultancy updated successfully!");
      setError("");
      document.getElementById("update_c_modal").close();
      setTimeout(() => setEditingConsultancy(null), 300);
    } catch (err) {
      console.error("Update error detail:", err.response?.data);
      setError(
        err.response?.data?.message || "Update failed. Check required fields.",
      );
      setSuccess("");
    }
  };

  // DELETE
  const handleDeleteConsultancy = async (consultancy) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${consultancy.consultancy_name}?`,
      )
    )
      return;
    try {
      await deleteConsultancy(consultancy.id);
      setConsultancies((prev) => prev.filter((c) => c.id !== consultancy.id));
      setSuccess("Consultancy deleted.");
      setError("");
    } catch (err) {
      setError("Failed to delete consultancy.");
    }
  };

  const filteredConsultancy = consultancies.filter((c) =>
    Object.values(c).join(" ").toLowerCase().includes(search.toLowerCase()),
  );

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
          className="flex flex-row gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto hover:cursor-pointer"
        >
          <Plus size={18} /> Add Consultancy
        </button>
      </div>

      <div className="rounded-lg p-4 sm:p-6 border border-gray-400">
        <h2 className="text-lg font-semibold mb-2">All consultancies</h2>
        <SeacrhModal
          placeholder="Search..."
          value={search}
          onChange={setSearch}
        />

        {/* Desktop Table */}
        <div className="overflow-x-auto hidden md:block">
          <Table
            headers={headers}
            data={filteredConsultancy}
            renderRow={(c) => (
              <tr
                key={c.id}
                className="border-b border-gray-700 hover:bg-base-300"
              >
                <td className="px-4 py-2">
                  <img
                    src={c.logo}
                    className="w-10 h-10 rounded-lg object-cover"
                    alt=""
                  />
                </td>
                <td className="px-4 py-4">{c.consultancy_name}</td>
                <td className="px-4 py-4">{c.email}</td>
                <td className="px-4 py-4">{c.phone}</td>
                <td className="px-4 py-4">{c.country}</td>
                <td className="px-4 py-4">{c.service_fee}</td>
                <td className="px-4 py-4">{c.currency}</td>
                <td className="px-4 py-4">{c.students}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs text-white ${isActive(c.status) ? "bg-blue-600" : "bg-gray-600"}`}
                  >
                    {isActive(c.status) ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-4">
                    <button
                      className="hover:underline hover:text-blue-300"
                      onClick={() => {
                        setSelectedConsultancy(c);
                        document.getElementById("view_c_modal").showModal();
                      }}
                    >
                      View
                    </button>
                    <button
                      className="hover:underline hover:text-blue-300"
                      onClick={() => handleEditClick(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:underline hover:text-red-300"
                      onClick={() => handleDeleteConsultancy(c)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )}
          />
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {filteredConsultancy.map((c) => (
            <MobileCard
              key={c.id}
              title={c.consultancy_name}
              image={c.logo}
              fields={[
                {
                  label: "Status",
                  value: isActive(c.status) ? "Active" : "Inactive",
                },
                { label: "Country", value: c.country },
              ]}
              actions={[
                {
                  label: "Edit",
                  className: "text-yellow-400",
                  onClick: () => handleEditClick(c),
                },
                {
                  label: "Delete",
                  className: "text-red-400",
                  onClick: () => handleDeleteConsultancy(c),
                },
              ]}
            />
          ))}
        </div>
      </div>

      <FormModal
        id="add_consultancy_modal"
        title="Add Consultancy"
        fields={consultancyFields}
        onSave={handleAddConsultancy}
      />
      <ViewModal
        id="view_c_modal"
        title="Consultancy Details"
        fields={consultancyFields}
        data={selectedConsultancy}
      />
      <UpdateModal
        id="update_c_modal"
        title="Edit Consultancy"
        fields={consultancyFields}
        data={editingConsultancy}
        onSave={handleEditConsultancy}
      />
    </div>
  );
};

export default Consultancy;
