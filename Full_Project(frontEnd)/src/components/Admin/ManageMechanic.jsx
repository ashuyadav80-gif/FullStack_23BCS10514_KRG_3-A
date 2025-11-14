import { useEffect, useState } from "react";
import { Wrench, User } from "lucide-react";
import bgImage from "/src/images/ManageMech.jpg";

function ManageMechanic() {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch mechanics from backend
  const fetchMechanics = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT stored after login

      if (!token) {
        setError("Please log in as admin to view mechanics.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/admin/all-mechanics",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      setMechanics(data);
    } catch (err) {
      console.error("Error fetching mechanics:", err);
      setError("Failed to load mechanics. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMechanics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900/90 text-indigo-400 text-xl font-semibold">
        Loading mechanics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900/90 text-red-400 text-lg font-medium">
        {error}
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen p-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay Container for Readability */}
      <div className="min-h-full  p-8 rounded-xl shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-white mb-2 flex items-center justify-center gap-4 drop-shadow-lg">
            <Wrench className="w-10 h-10 text-indigo-400" />
            Manage Mechanics
          </h1>
          <p className="text-indigo-200 text-xl font-medium drop-shadow-lg">
            View all registered mechanics in the system.
          </p>
        </div>

        {/* Mechanics Table Card (Semi-transparent dark card) */}
        <div className="max-w-5xl mx-auto bg-gray-800/80 rounded-2xl shadow-2xl p-6 border border-indigo-700 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-indigo-400" /> Mechanics List
          </h2>

          {mechanics.length === 0 ? (
            <p className="text-center text-gray-400">No mechanics found.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-900/70 text-indigo-300 text-left border-b border-indigo-700">
                  <th className="p-3 border-r border-indigo-800">ID</th>
                  <th className="p-3 border-r border-indigo-800">Full Name</th>
                  <th className="p-3 border-r border-indigo-800">Email</th>
                  <th className="p-3 border-r border-indigo-800">Role</th>
                  <th className="p-3">Created At</th>
                </tr>
              </thead>
              <tbody>
                {mechanics.map((m, index) => (
                  <tr
                    key={m.id}
                    // Alternate row colors for better readability
                    className={`${index % 2 === 0 ? 'bg-gray-800/70' : 'bg-gray-900/70'} 
                                 hover:bg-indigo-800/70 transition duration-200 text-gray-200 border-b border-gray-700`}
                  >
                    <td className="p-3">{m.id}</td>
                    <td className="p-3 font-medium text-white">{m.fullName}</td>
                    <td className="p-3 text-indigo-300">{m.email}</td>
                    <td className="p-3 text-sm">{m.role}</td>
                    <td className="p-3">
                      {new Date(m.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Vehicle Service System | Admin Panel
        </footer>
      </div>
    </div>
  );
}

export default ManageMechanic;