import { Plus, Search } from "lucide-react";
import Sidebar from "../components/SideBar";

const counselors = [
  { id: 1, name: "John Doe", email: "john.counselor@example.com", countries: "UK, USA", status: "Available" },
  { id: 2, name: "Jane Smith", email: "jane.counselor@example.com", countries: "Australia, Canada", status: "Busy" },
  { id: 3, name: "Mike Johnson", email: "mike.counselor@example.com", countries: "Japan, South Korea", status: "Available" },
];

const Counselors = () => {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold ">Counselors</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage counselor assignments and availability
            </p>
          </div>

          <button className="btn btn-primary bg-[#1d4ed8] hover:bg-blue-700 border-none  normal-case rounded-lg px-6">
            <Plus size={18} className="mr-1" /> Add Counselor
          </button>
        </div>

        {/* Main Content Card */}
        <div className=" rounded-xl border border-gray-700 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold ">All Counselors</h2>
            <p className="text-gray-400 text-sm">
              View and manage all counselors and their assignments
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 "
            />
            <input
              type="text"
              placeholder="Search counselors..."
              className="input w-full pl-12 bg-transparent border-gray-700 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table w-full border-none">
              <thead className=" border-none">
                <tr className="border-none text-[13px] uppercase tracking-wider">
                  <th className="bg-transparent pl-0 font-medium">S.N.</th>
                  <th className="bg-transparent font-medium">Counselor</th>
                  <th className="bg-transparent font-medium">Email</th>
                  <th className="bg-transparent font-medium text-center">Counseling Country</th>
                  <th className="bg-transparent font-medium text-center">Status</th>
                  <th className="bg-transparent text-right pr-0 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {counselors.map((c, index) => (
                  <tr key={c.id} className="border-none hover:bg-white/5 transition-colors group">
                    <td className="pl-0 ">{index + 1}</td>

                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-9 rounded-full ">
                             {/* Placeholder for the person icon shown in your image */}
                            <img src={`https://ui-avatars.com/api/?name=${c.name}&background=fdba74&color=7c2d12`} alt="avatar" />
                          </div>
                        </div>
                        <span className="font-semibold ">{c.name}</span>
                      </div>
                    </td>

                    <td className="">{c.email}</td>
                    <td className="text-center ">{c.countries}</td>

                    <td className="text-center">
                      <span
                        className={`badge border-none py-3 px-4 text-xs font-semibold rounded-md ${
                          c.status === "Available"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td className="text-right pr-0">
                      <div className="flex items-center justify-start gap-5">
                        <button className="   font-medium">View</button>
                        <button className="   font-medium">Edit</button>
                        <button className="   font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Counselors;