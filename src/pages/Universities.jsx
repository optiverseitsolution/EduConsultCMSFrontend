import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import oxford from "../assets/logos/oxford.png";
import MobileCard from "../components/MobileCard";
import { Plus } from "lucide-react";
import FormModal from "../components/modal/FormModal";
import ViewModal from "../components/modal/ViewModal";
import SeacrhModal from "../components/modal/SeacrhModal";
import {
  getAllUniversity,
  registerUniversity,
  updateUniversity,
  deleteUniversity,
  updateUniversityStatus,
} from "../api/universityService";
import UpdateModal from "../components/modal/UpdateModal";

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [error, setError] = useState("");
  const [selectedUni, setSelectedUni] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

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

  const uniFields = [
    {
      name: "logo",
      label: "Logo",
      type: "file",
    },
    {
      name: "name",
      label: "University Name",
      placeholder: "Stanford University",
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: ["USA", "UK", "Australia", "Canada"],
    },
    { name: "city", label: "City", placeholder: "Stanford" },
    {
      name: "partnerType",
      label: "Partner Type",
      type: "select",
      options: ["Partner", "Non-Partner"],
    },
    {
      name: "programs",
      label: "Number of Programs",
      type: "number",
      placeholder: "52",
      min: "0",
    },
    {
      name: "applicationFee",
      label: "Application Fee ($)",
      type: "number",
      placeholder: "75",
      min: "0",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive"],
    },
  ];

  const handleAddUni = async (newUni) => {
    try {
      const created = await registerUniversity(newUni);

      const formattedUniversity = {
        id: created.id,
        logo: created.logo,
        name: created.university_name,
        country: created.country,
        city: created.city,
        partnerType: created.partner_type,
        programs: created.programs,
        applicationFee: created.application_fee.replace("$", ""),
        status: created.status === "1" ? "Active" : "Inactive",
      };

      setUniversities((prev) => [...prev, formattedUniversity]);
    } catch (err) {
      throw err;
    }
  };

  const filteredUni = universities.filter((uni) =>
    Object.values(uni).join(" ").toLowerCase().includes(search.toLowerCase()),
  );

  //get all uni
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const uni = await getAllUniversity();
        const formattedUniversities = uni.map((item) => ({
          id: item.id,
          logo: item.logo,
          name: item.university_name,
          country: item.country,
          city: item.city,
          partnerType: item.partner_type,
          programs: item.programs,
          applicationFee: item.application_fee.replace("$", ""),
          status: item.status === true ? "Active" : "Inactive",
        }));
        setUniversities(formattedUniversities);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const handleEditUni = async (updateUni) => {
    if (!selectedUni?.id) {
      console.error("Cannot update university: ID is missing");
      return;
    }

    try {
      const uniToUpdate = { ...updateUni, id: selectedUni.id };

      const updated = await updateUniversity(uniToUpdate);

      const formattedUniversity = {
        id: updated.id,
        logo: updated.logo,
        name: updated.university_name,
        country: updated.country,
        city: updated.city,
        partnerType: updated.partner_type,
        programs: updated.programs,
        applicationFee: updated.application_fee.replace("$", ""),
        status: updated.status === "1" ? "Active" : "Inactive",
      };

      setUniversities((prev) =>
        prev.map((uni) =>
          uni.id === formattedUniversity.id ? formattedUniversity : uni,
        ),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDeleteUni = async (uni) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }
    try {
      await deleteUniversity({ id: uni.id });

      setUniversities((prev) => prev.filter((u) => u.id !== uni.id));
    } catch (err) {
      console.error("Failed to delete university:", err);
      alert("Failed to delete university. Please try again.");
    }
  };

  //status
  const handleToggleStatus = async (uniId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? 0 : 1;
      await updateUniversityStatus(uniId, newStatus);

      setUniversities((prev) =>
        prev.map((u) =>
          u.id === uniId
            ? { ...u, status: newStatus === 1 ? "Active" : "Inactive" }
            : u,
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
          <h1 className="text-2xl font-bold">Universities / Programs</h1>
          <p className="text-gray-400">
            Manage partner and non-partner institutions
          </p>
        </div>
        <button
          onClick={() => document.getElementById("add_uni_modal").showModal()}
          className="flex flex-row gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto hover:cursor-pointer"
        >
          <Plus size={18} /> Add University
        </button>
      </div>

      <div className="rounded-lg p-4 sm:p-6 border border-gray-400">
        <h2 className="text-lg font-semibold mb-2">All Universities</h2>
        <p className="text-gray-400 text-sm mb-4">
          View and manage university partnerships
        </p>
        {/* Search Bar */}
        <SeacrhModal
          placeholder="universities"
          value={search}
          onChange={setSearch}
        />
        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            "Loading..."
          ) : (
            <>
              <Table
                headers={headers}
                data={filteredUni}
                renderRow={(university) => (
                  <tr
                    key={university.id}
                    className="border-b border-gray-700 hover:bg-base-300"
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
                        <p className="bg-blue-600 rounded-lg w-fit px-3 py-1 text-xs text-white">
                          {university.partnerType}
                        </p>
                      ) : (
                        <p className="bg-gray-600 rounded-lg w-fit px-3 py-1 text-xs text-white">
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
                      <button
                        onClick={() =>
                          handleToggleStatus(university.id, university.status)
                        }
                        className={`${
                          university.status === "Active"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-600 hover:bg-gray-700"
                        } text-white px-3 py-1 rounded-lg text-xs transition-colors`}
                      >
                        {university.status}
                      </button>
                    </td>
                    <td className="px-2 sm:px-4 py-4">
                      <div className="flex gap-2 sm:gap-4 text-xs sm:text-base">
                        <button
                          className="hover:text-blue-300 hover:cursor-pointer"
                          onClick={() => {
                            setSelectedUni(university);
                            document
                              .getElementById("view_uni_modal")
                              .showModal();
                          }}
                        >
                          View
                        </button>
                        <button
                          className="hover:text-blue-300"
                          onClick={() => {
                            setSelectedUni(university);
                            document
                              .getElementById("update_uni_modal")
                              .showModal();
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="hover:text-red-300"
                          onClick={() => handleDeleteUni(university)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              />
            </>
          )}
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredUni.map((uni) => (
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
                    onClick: () => {
                      setSelectedUni(uni);
                      document.getElementById("view_uni_modal").showModal();
                    },
                  },
                  {
                    label: "Edit",
                    className: "text-blue-400 text-sm",
                    onClick: () => {
                      setSelectedUni(uni);
                      document.getElementById("update_uni_modal").showModal();
                    },
                  },
                  {
                    label: "Delete",
                    className: "text-red-400 text-sm",
                    onClick: () => handleDeleteUni(uni),
                  },
                ]}
              />
            ))}
          </div>
        </div>
      </div>
      <FormModal
        id="add_uni_modal"
        title="Add University"
        fields={uniFields}
        onSave={handleAddUni}
      />
      <ViewModal
        id="view_uni_modal"
        title="University Details"
        fields={uniFields}
        data={selectedUni}
      />
      <UpdateModal
        id="update_uni_modal"
        title="Edit Univeristy"
        fields={uniFields}
        data={selectedUni}
        onSave={handleEditUni}
      />
    </div>
  );
};

export default Universities;
