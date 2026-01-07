import React from "react";

const Table = ({ headers = [], data = [], renderRow }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-300">
        <thead>
          <tr className="border-b border-gray-700 text-left font-bold">
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => renderRow(item, index))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-6 text-gray-400"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
