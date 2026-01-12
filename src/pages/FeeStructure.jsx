import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import MobileCard from "../components/MobileCard";
import { Plus } from "lucide-react";
import FormModal from "../components/modal/FormModal";

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
          className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto"
        >
          <Plus size={18} /> Add Fee
        </button>
      </div>

      {/* Table Section */}
      <div className=" rounded-lg p-4 sm:p-6 border border-gray-400">
        <h2 className="text-lg font-semibold mb-2">All Fees</h2>
        <p className="text-gray-400 text-sm mb-4">
          View and manage all fee structures
        </p>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search fees..."
              className="w-full  pl-10 pr-2 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto hidden md:block">
          <Table
            headers={headers}
            data={fees}
            renderRow={(fee) => (
              <tr
                key={fee.id}
                className="border-b border-gray-700 hover:bg-gray-800"
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
