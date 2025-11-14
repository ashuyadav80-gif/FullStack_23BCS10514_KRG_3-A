import { Users, Wrench, ClipboardList, Settings, LogOut, LayoutDashboard } from "lucide-react";
import bgImage from "/src/images/AdminDash.jpg";

function AdminDashboard() {
  // Define navigation items for the sidebar (excluding Logout for separate styling)
  const navItems = [
    { name: "Manage Mechanics", icon: Wrench, href: "/admin/mechanics", description: "Mechanics Controller | View Details of Mechanics" },
    { name: "Manage Customers", icon: Users, href: "/admin/customers", description: "View customer records and booking details." },
    { name: "Manage Jobs", icon: ClipboardList, href: "/admin/jobs", description: "Track job assignments, progress, and service reports." },
    { name: "Profile", icon: Settings, href: "/admin/settings", description: "Update system configurations and admin preferences." },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar for Navigation and Logout */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between shadow-2xl p-4 sticky top-0 h-screen">
        <div>
          {/* Dashboard Title/Logo */}
          <div className="flex items-center space-x-2 p-2 mb-8 border-b border-gray-700">
            <LayoutDashboard className="w-8 h-8 text-indigo-400" />
            <h1 className="text-2xl font-bold text-indigo-100">Admin Panel</h1>
          </div>

          {/* Navigation Links (Logout is kept separate at the bottom) */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors group"
              >
                <item.icon className="w-5 h-5 text-indigo-400 group-hover:text-white" />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
        
        {/* Logout Button (At the top/bottom of the sidebar) */}
        <a
          href="/"
          className="flex items-center justify-center space-x-3 p-3 mt-8 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Logout</span>
        </a>
      </aside>

      {/* Main Content Area */}
      <div 
        className="flex-1 p-10 overflow-y-auto"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // The overlay adds readability over the background image
          // Tailwind utility classes can't do this directly, so inline style is used for the overlay effect.
        }}
      >
        <div className="min-h-full   p-8 rounded-xl shadow-2xl">
          {/* Header Section */}
          <header className="mb-10 text-center">
            <h1 className="text-5xl font-extrabold text-white mb-2 tracking-wide">
              Admin Dashboard
            </h1>
            <p className="text-xl font-medium text-red-300">
              Manage users, jobs, and system settings from one place.
            </p>
          </header>

          {/* Dashboard Cards (The main content, keeping original styles but adapted for dark overlay) */}
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Map over the navItems to create the dashboard cards */}
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="bg-white/10 border-t-4 border-green-600 rounded-2xl shadow-xl p-8 hover:scale-[1.02] hover:shadow-green-400 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <item.icon className="w-12 h-12 text-yellow-600 mb-4 group-hover:text-red-800 transition-colors" />
                <h2 className="text-2xl font-semibold text-blue-300 mb-2">
                  {item.name}
                </h2>
                <p className="text-white">
                  {item.description}
                </p>
              </a>
            ))}
            {/* The Logout button is now in the sidebar, so the empty space is removed or filled */}
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-sm text-white/70 text-center">
          © {new Date().getFullYear()} Vehicle Service System | Admin Panel
        </footer>
      </div>
    </div>
  );
}

export default AdminDashboard;