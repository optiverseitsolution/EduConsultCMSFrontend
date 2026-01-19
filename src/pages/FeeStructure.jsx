import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import { Plus } from "lucide-react";
import FormModal from "../components/modal/FormModal";
import SeacrhModal from "../components/modal/SeacrhModal";

const FeeStructure = () => {
  const [fees, setFees] = useState([
    {
      id: 1,
      consultancy: "ABC Education Consultancy",
      feeType: "Application Fee",
      amount: 500,
      currency: "USD",
    },
    {
      id: 2,
      consultancy: "ABC Education Consultancy",
      feeType: "Counseling Fee",
      amount: 200,
      currency: "USD",
    },
    {
      id: 3,
      consultancy: "Global Study Partners",
      feeType: "Application Fee",
      amount: 400,
      currency: "GBP",
    },
    {
      id: 4,
      consultancy: "Global Study Partners",
      feeType: "Document Verification",
      amount: 150,
      currency: "GBP",
    },
  ]);

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
      name: "consultancy",
      label: "Consultancy",
      placeholder: "Global Study Partners",
    },
    {
      name: "feeType",
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

  const handleAddFee = (newFee) => {
    setFees((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newFee,
      },
    ]);
  };

  const [search, setSearch] = useState("");

  const filteredFee = fees.filter((fee) =>
    Object.values(fee).join(" ").toLowerCase().includes(search.toLowerCase())
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
                <td className="px-4 py-4">{fee.consultancy}</td>
                <td className="px-4 py-4">
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-xs text-white">
                    {fee.feeType}
                  </span>
                </td>
                <td className="px-4 py-4 font-medium">{fee.amount}</td>
                <td className="px-4 py-4">{fee.currency}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-4 text-sm">
                    <button className="hover:text-blue-400">Edit</button>
                    <button className="hover:text-red-400">Delete</button>
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
              title={fee.consultancy}
              fields={[
                { label: "Fee Type", value: fee.feeType },
                { label: "Amount", value: fee.amount },
                { label: "Currency", value: fee.currency },
              ]}
              actions={[
                {
                  label: "Edit",
                  className: "text-blue-400 text-sm",
                  onClick: () => console.log("Edit", fee),
                },
                {
                  label: "Delete",
                  className: "text-red-400 text-sm",
                  onClick: () => console.log("Delete", fee),
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
    </div>
  );
};

export default FeeStructure;
