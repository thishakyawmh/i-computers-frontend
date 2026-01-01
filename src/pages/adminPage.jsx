import { Link, Route, Routes, useLocation } from "react-router-dom";
import { HiOutlineClipboardList, HiMenuAlt2, HiX } from "react-icons/hi";
import { BsBoxes } from "react-icons/bs";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineRateReview } from "react-icons/md";
import { useState, useEffect } from "react";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductsPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrders from "./admin/adminOrders";

export default function AdminPage() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const navItems = [
    { path: "/admin", label: "Orders", icon: HiOutlineClipboardList },
    { path: "/admin/products", label: "Products", icon: BsBoxes },
    { path: "/admin/users", label: "Users", icon: LuUsersRound },
    { path: "/admin/reviews", label: "Reviews", icon: MdOutlineRateReview },
  ];

  return (
    <div className="w-full h-screen flex bg-black overflow-hidden relative">
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside className={`fixed lg:static inset-y-0 left-0 w-[240px] h-full bg-surface border-r border-white/10 flex flex-col z-40 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="w-full h-[100px] flex items-center px-6 border-b border-white/5 gap-3">
          <img src="/logo.png" alt="Logo" className="h-10 sm:h-12 object-contain" />
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-white font-headings tracking-wider leading-tight">ICM</span>
            <span className="text-[10px] font-bold text-primary-400 tracking-[0.1em] uppercase">
              {new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening"}
            </span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden ml-auto p-2 text-gray-500 hover:text-white">
            <HiX className="text-xl" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col p-4 gap-2 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center h-12 px-4 gap-4 rounded-xl transition-all duration-300 group ${active
                  ? "bg-primary-600 text-white shadow-glow"
                  : "text-gray-500 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon className={`text-xl ${active ? "text-white" : "text-gray-500 group-hover:text-primary-400"}`} />
                <span className="font-medium">{item.label}</span>
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center text-white font-bold">A</div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-bold text-white truncate">Admin User</span>
              <span className="text-xs text-gray-500 truncate">Super Admin</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-black h-full relative overflow-y-auto overflow-x-hidden">
        <div className="lg:hidden h-16 border-b border-white/5 bg-black/80 backdrop-blur-md flex items-center px-4 sticky top-0 z-20">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-white hover:bg-white/5 rounded-lg transition-colors">
            <HiMenuAlt2 className="text-2xl" />
          </button>
          <span className="ml-4 font-bold text-white uppercase tracking-widest text-sm">Dashboard</span>
        </div>

        <div className="fixed top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-900/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>

        <div className="p-4 sm:p-8 relative z-10 w-full max-w-[1400px] mx-auto min-h-full">
          <Routes>
            <Route path="/" element={<AdminOrders />} />
            <Route path="/products" element={<AdminProductsPage />} />
            <Route path="/add-product" element={<AdminAddProductsPage />} />
            <Route path="/update-product" element={<AdminUpdateProductPage />} />
            <Route
              path="/users"
              element={
                <h1 className="text-2xl sm:text-3xl font-bold font-headings text-white mb-6">
                  User Management
                </h1>
              }
            />
            <Route
              path="/reviews"
              element={
                <h1 className="text-2xl sm:text-3xl font-bold font-headings text-white mb-6">
                  Review Management
                </h1>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}
