import { Link, Route, Routes, useLocation } from "react-router-dom";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsBoxes } from "react-icons/bs";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineRateReview } from "react-icons/md";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductsPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";

export default function AdminPage() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: "/admin", label: "Orders", icon: HiOutlineClipboardList },
    { path: "/admin/products", label: "Products", icon: BsBoxes },
    { path: "/admin/users", label: "Users", icon: LuUsersRound },
    { path: "/admin/reviews", label: "Reviews", icon: MdOutlineRateReview },
  ];

  return (
    <div className="w-full h-screen flex bg-black overflow-hidden">
      <aside className="w-[280px] h-full bg-surface border-r border-white/10 flex flex-col relative z-20">
        <div className="w-full h-[90px] flex items-center px-8 border-b border-white/5">
          <img src="/logo.png" alt="Logo" className="h-10 object-contain" />
          <span className="text-2xl font-bold text-white font-headings ml-3 tracking-wider">ICM</span>
          <span className="ml-2 text-xs bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded border border-primary-500/30">Admin</span>
        </div>

        <nav className="flex-1 flex flex-col p-4 gap-2">
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
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">Admin User</span>
              <span className="text-xs text-gray-500">Super Admin</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-black h-full relative overflow-y-auto">
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="p-8 relative z-10 w-full max-w-[1400px] mx-auto min-h-full">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="text-3xl font-bold font-headings text-white mb-6">
                  Dashboard Overview
                </h1>
              }
            />
            <Route path="/products" element={<AdminProductsPage />} />
            <Route path="/add-product" element={<AdminAddProductsPage />} />
            <Route path="/update-product" element={<AdminUpdateProductPage />} />
            <Route
              path="/users"
              element={
                <h1 className="text-3xl font-bold font-headings text-white mb-6">
                  User Management
                </h1>
              }
            />
            <Route
              path="/reviews"
              element={
                <h1 className="text-3xl font-bold font-headings text-white mb-6">
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
