import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import { Plus } from "lucide-react";
import FormModal from "../components/modal/FormModal";
import SeacrhModal from "../components/modal/SeacrhModal";
import {
  deletFeeStructure,
  getAllFeeStructures,
  registerFee,
  updateFeeStructure,
} from "../api/feeStructureService";
import UpdateModal from "../components/modal/UpdateModal";

const FeeStructure = () => {
  const [fees, setFees] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedFee, setSelectedFee] = useState(null);

  const headers = [
    "ID",
    "Consultancy Name",
    "Fee Type",
    "Amount",
    "Currency",
    "Actions",
  ];
  const feeFields = [
    {
      name: "consultancy_name",
      label: "Consultancy",
      placeholder: "Global Study Partners",
    },
    {
      name: "fee_type",
      label: "Fee Type",
      type: "select",
      options: [
        "Document Verification",
        "Application Processing",
        "Visa Assistance",
        "Counseling Fee",
      ],
    },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      placeholder: "150",
      min: "0",
    },
    {
      name: "currency",
      label: "Currency",
      type: "select",
      options: ["USD", "GBP", "EUR", "AUD"],
    },
  ];

  //create
  const handleAddFee = async (newFee) => {
    try {
      const created = await registerFee(newFee);

      setFees((prev) => [...prev, created]);
      setSuccess("Fee added successfully");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };

  //getAll
  useEffect(() => {
    const fetchFee = async () => {
      try {
        const fees = await getAllFeeStructures();

        const formattedFee = fees.map((fee) => ({
          id: fee.id,
          consultancy_name: fee.consultancy_name,
          fee_type: fee.fee_type,
          amount: fee.amount,
          currency: fee.currency,
        }));
        setFees(formattedFee);
      } catch (err) {
        throw err;
      }
    };
    fetchFee();
  }, []);

  //update
  const handleEditFee = async (updatedData) => {
    if (!selectedFee?.id) {
      return;
    }

    try {
      const updated = await updateFeeStructure(updatedData);
      setFees((prev) =>
        prev.map((fee) => (fee.id === selectedFee.id ? updated : fee)),
      );
      document.getElementById("update_fee_modal").close();
      setSelectedFee(null);
      setSuccess("Fee Updated Successfully");
      setError("");
    } catch (err) {
      console.log("Update error:", err.response?.data);
      setError(err.response?.data?.message || "Update failed");
    }
  };

  //delete

  const handleDeleteFee = async (fee) => {
    if (!window.confirm("Are you sure you want to delete this fee structre?")) {
      return;
    }
    try {
      await deletFeeStructure({ id: fee.id });

      setFees((prev) => prev.filter((u) => u.id !== fee.id));
    } catch (err) {
      console.error("Failed to delete user", err);
      alert("Failed to delete FEE STRUCTURE. Please try again.");
    }
  };

  const filteredFee = fees.filter((fee) =>
    Object.values(fee).join(" ").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Fee Structure</h1>
          <p className="text-gray-400">Manage fee types and pricing</p>
        </div>
        <button
          onClick={() => document.getElementById("add_fee_modal").showModal()}
          className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto hover:cursor-pointer"
        >
          <Plus size={18} /> Add Fee
        </button>
      </div>

      <div className=" rounded-lg p-4 sm:p-6 border border-gray-400">
        <h2 className="text-lg font-semibold mb-2">All Fees</h2>
        <p className="text-gray-400 text-sm mb-4">
          View and manage all fee structures
        </p>

        <SeacrhModal placeholder="fees" onChange={setSearch} value={search} />

        {error && <span className="text-red-500">{error}</span>}

        {success && <span className="text-green-500">{success}</span>}

        <div className="overflow-x-auto hidden md:block">
          <Table
            headers={headers}
            data={filteredFee}
            renderRow={(fee) => (
              <tr
                key={fee.id}
                className="border-b border-gray-700 hover:bg-base-300"
              >
                <td className="px-4 py-4">{fee.id}</td>
                <td className="px-4 py-4">{fee.consultancy_name}</td>
                <td className="px-4 py-4">
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-xs text-white">
                    {fee.fee_type}
                  </span>
                </td>
                <td className="px-4 py-4 font-medium">{fee.amount}</td>
                <td className="px-4 py-4">{fee.currency}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-4 text-sm">
                    <button
                      className="hover:text-blue-400"
                      onClick={() => {
                        setSelectedFee(fee);
                        document.getElementById("update_fee_modal").showModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:text-red-400"
                      onClick={() => handleDeleteFee(fee)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )}
          />
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {fees.map((fee) => (
            <MobileCard
              key={fee.id}
              title={fee.consultancy_name}
              fields={[
                { label: "Fee Type", value: fee.fee_type },
                { label: "Amount", value: fee.amount },
                { label: "Currency", value: fee.currency },
              ]}
              actions={[
                {
                  label: "Edit",
                  className: "text-blue-400 text-sm",
                  onClick: () => {
                    setSelectedFee(fee);
                    document.getElementById("update_fee_modal").showModal();
                  },
                },
                {
                  label: "Delete",
                  className: "text-red-400 text-sm",
                  onClick: () => handleDeleteFee(fee),
                },
              ]}
            />
          ))}
        </div>
      </div>
      <FormModal
        id="add_fee_modal"
        title="Add Fee Structure"
        fields={feeFields}
        onSave={handleAddFee}
      />
      <UpdateModal
        id="update_fee_modal"
        title="Edit Fee Structure"
        fields={feeFields}
        data={selectedFee}
        onSave={handleEditFee}
      />
    </div>
  );
};

export default FeeStructure;
