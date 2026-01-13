import { Plus, Search } from "lucide-react";
import Sidebar from "../components/SideBar";

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    course: "BSc IT",
    university: "Oxford University",
    status: "Active",
    application: "Approved",
    counselor: "John Doe",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    course: "MSc CS",
    university: "MIT",
    status: "Active",
    application: "Pending",
    counselor: "Jane Smith",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    course: "MBA",
    university: "Stanford",
    status: "Active",
    application: "Under Review",
    counselor: "Mike Johnson",
  },
];

const Students = () => {
  return (
    <div className="flex min-h-screen ">
       
      {/* Main */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Students Management
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Track and manage student applications
            </p>
          </div>

          <button className="btn bg-blue-600 text-white hover:bg-blue-700 border-none normal-case rounded-lg px-6 w-full sm:w-auto flex items-center justify-center gap-2">
            <Plus size={18} />
            Add Student
          </button>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-gray-800 p-4 sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">All Students</h2>
            <p className="text-gray-400 text-sm">
              View and manage all registered students
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search students..."
              className="input w-full pl-12 bg-transparent border-gray-700 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table min-w-[1100px]">
              <thead>
                <tr className="text-xs uppercase tracking-wider font-bold">
                  <th>S.N.</th>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Applied University</th>
                  <th>Status</th>
                  <th>Application</th>
                  <th>Counselor</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {students.map((s, i) => (
                  <tr
                    key={s.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td>{i + 1}</td>

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <img
                              src={`https://ui-avatars.com/api/?name=${s.name}&background=2563eb&color=fff`}
                              alt="avatar"
                            />
                          </div>
                        </div>
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </td>

                    <td>{s.email}</td>
                    <td>{s.course}</td>
                    <td>{s.university}</td>

                    <td>
                      <span className="badge bg-blue-600 border-none text-xs">
                        {s.status}
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-gray-700 border-none text-xs">
                        {s.application}
                      </span>
                    </td>

                    <td>{s.counselor}</td>

                    <td>
                      <div className="flex items-center gap-4">
                        <button className="hover:text-blue-500">View</button>
                        <button className="hover:text-yellow-500">Edit</button>
                        <button className="hover:text-red-500">Delete</button>
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

export default Students;
