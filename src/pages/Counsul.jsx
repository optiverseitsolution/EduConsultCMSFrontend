import React, { useState } from "react";
import { Plus } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import FormModal from "../components/modal/FormModal";
import UpdateModal from "../components/modal/UpdateModal";
import {
  getCounselors,
  createCounselor,
  updateCounselor,
  deleteCounselor,
} from "../api/conselorService";

const Counselors = () => {
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [editingCounselor, setEditingCounselor] = useState(null);
  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();

  // ─── Fetch ────────────────────────────────────────────────────────────────
  const {
    data: counselors = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["counselors"],
    queryFn: getCounselors,
  });

  // ─── Status helpers ───────────────────────────────────────────────────────
  // GET returns boolean true/false, PUT returns "1"/"0" — handle all formats
  // true / "1" / 1 = Active,  false / "0" / 0 = Inactive
  const isActive = (status) => {
    if (status === true  || status === "true")  return true;
    if (status === false || status === "false") return false;
    return String(status) === "1";
  };

  const mapStatusToLabel = (status) => isActive(status) ? "Active" : "Inactive";

  const mapStatusToValue = (status) => {
    if (status === "Active")   return "1";
    if (status === "Inactive") return "0";
    return status;
  };

  // ─── Create ───────────────────────────────────────────────────────────────
  const createMutation = useMutation({
    mutationFn: (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        const val = key === "status" ? mapStatusToValue(value) : value;
        formData.append(key, val);
      });
      return createCounselor(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counselors"] });
      document.getElementById("add_counselor_modal").close();
    },
    onError: (err) => {
      console.error("Create failed:", err);
    },
  });

  // ─── Edit click — map status to label for dropdown, separate state ────────
  const handleEdit = (c) => {
    setEditingCounselor({
      ...c,
      status: mapStatusToLabel(c.status), // true→"Active", false→"Inactive"
    });
    document.getElementById("update_counselor_modal").showModal();
  };

  // ─── Update ───────────────────────────────────────────────────────────────
  const handleEditCounselor = async (updatedData) => {
    if (!editingCounselor?.id) return;

    const formData = new FormData();
    formData.append("_method", "PUT");

    const fields = ["name", "email", "counseling_country", "status"];
    fields.forEach((key) => {
      const val = key === "status"
        ? mapStatusToValue(updatedData[key] ?? "")
        : (updatedData[key] ?? "");
      formData.append(key, val);
    });

    const result = await updateCounselor({ id: editingCounselor.id, data: formData });
    queryClient.invalidateQueries({ queryKey: ["counselors"] });
    setTimeout(() => setEditingCounselor(null), 300);
    return result;
  };

  // ─── Delete ───────────────────────────────────────────────────────────────
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteCounselor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counselors"] });
      document.getElementById("delete_counselor_modal").close();
    },
    onError: (err) => {
      console.error("Delete failed:", err);
    },
  });

  // ─── Config ───────────────────────────────────────────────────────────────
  const headers = [
    "S.N.", "Counselor", "Email", "Counseling Countries", "Status", "Actions",
  ];

  const counselorFields = [
    { name: "name", label: "Counselor Name", placeholder: "John Doe" },
    { name: "email", label: "Email", type: "email", placeholder: "john@example.com" },
    { name: "counseling_country", label: "Counseling Countries", placeholder: "UK, USA" },
    { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
  ];

  const filtered = counselors.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  // ─── Loading / Error ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium">
        Failed to load counselors
      </div>
    );
  }

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handleView = (c) => {
    setSelectedCounselor(c);
    document.getElementById("view_counselor_modal").showModal();
  };

  const handleDelete = (c) => {
    setSelectedCounselor(c);
    document.getElementById("delete_counselor_modal").showModal();
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Counselors</h1>
          <p className="text-gray-400">Manage counselor assignments and availability</p>
        </div>
        <button
          onClick={() => document.getElementById("add_counselor_modal").showModal()}
          className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto"
        >
          <Plus size={18} /> Add Counselor
        </button>
      </div>

      {/* Content */}
      <div className="rounded-lg p-4 sm:p-6 border border-gray-400">
        <h2 className="text-lg font-semibold mb-2">All Counselors</h2>
        <p className="text-gray-400 text-sm mb-4">View and manage all counselors and their assignments</p>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search counselors..."
              className="w-full pl-10 pr-2 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto hidden md:block">
          <Table
            headers={headers}
            data={filtered}
            renderRow={(c, index) => (
              <tr key={c.id} className="border-b border-gray-700 hover:bg-base-300">
                <td className="px-4 py-4">{index + 1}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.image || `https://ui-avatars.com/api/?name=${c.name}`}
                      alt={c.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4">{c.email}</td>
                <td className="px-4 py-4 text-center">{c.counseling_country}</td>
                <td className="px-4 py-4 text-center">
                  {/* ✅ isActive handles boolean true/false AND "1"/"0" */}
                  <span className={`px-3 py-1 rounded-lg text-xs ${isActive(c.status) ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200"}`}>
                    {isActive(c.status) ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-3 text-sm">
                    <button onClick={() => handleView(c)} className="hover:text-blue-300">View</button>
                    <button onClick={() => handleEdit(c)} className="hover:text-blue-300">Edit</button>
                    <button onClick={() => handleDelete(c)} className="hover:text-red-300">Delete</button>
                  </div>
                </td>
              </tr>
            )}
          />
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filtered.map((c) => (
            <MobileCard
              key={c.id}
              title={c.name}
              fields={[
                { label: "Email", value: c.email },
                { label: "Countries", value: c.counseling_country },
                { label: "Status", value: isActive(c.status) ? "Active" : "Inactive" },
              ]}
              actions={[
                { label: "View", className: "text-blue-400 text-sm", onClick: () => handleView(c) },
                { label: "Edit", className: "text-blue-400 text-sm", onClick: () => handleEdit(c) },
                { label: "Delete", className: "text-red-400 text-sm", onClick: () => handleDelete(c) },
              ]}
            />
          ))}
        </div>
      </div>

      {/* Add Modal */}
      <FormModal
        id="add_counselor_modal"
        title="Add Counselor"
        fields={counselorFields}
        onSave={(data) => createMutation.mutate(data)}
        isLoading={createMutation.isPending}
      />

      {/* Update Modal — editingCounselor has status as "Active"/"Inactive" for dropdown */}
      <UpdateModal
        id="update_counselor_modal"
        title="Edit Counselor"
        fields={counselorFields}
        data={editingCounselor}
        onSave={handleEditCounselor}
      />

      {/* View Modal */}
      <dialog id="view_counselor_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Counselor Details</h3>
          {selectedCounselor && (
            <div className="space-y-2">
              <p><b>Name:</b> {selectedCounselor.name}</p>
              <p><b>Email:</b> {selectedCounselor.email}</p>
              <p><b>Countries:</b> {selectedCounselor.counseling_country}</p>
              <p><b>Status:</b> {isActive(selectedCounselor.status) ? "Active" : "Inactive"}</p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Delete Modal */}
      <dialog id="delete_counselor_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Counselor</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedCounselor?.name}</span>?
          </p>
          <div className="modal-action gap-2">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <button
              className="btn btn-error"
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate(selectedCounselor.id)}
            >
              {deleteMutation.isPending ? (
                <span className="loading loading-spinner loading-sm" />
              ) : "Delete"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Counselors;