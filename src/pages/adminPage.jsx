import { Link, Route, Routes } from "react-router-dom";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsBoxes } from "react-icons/bs";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineRateReview } from "react-icons/md";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductsPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";

export default function AdminPage() {
  return (
    <div className="w-full h-full flex bg-gray-50">
      <aside className="w-[250px] h-full bg-gray-100 shadow-inner flex flex-col">
        <div className="w-full h-[90px] flex items-center px-4 border-b border-gray-200">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <h1 className="text-lg ml-3 font-semibold text-gray-800">Admin</h1>
        </div>

        <nav className="flex-1 flex flex-col mt-4">
          <Link
            to="/admin"
            className="flex items-center h-12 px-4 gap-3 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <HiOutlineClipboardList className="text-lg" />
            <span className="font-medium">Orders</span>
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center h-12 px-4 gap-3 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <BsBoxes className="text-lg" />
            <span className="font-medium">Products</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center h-12 px-4 gap-3 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <LuUsersRound className="text-lg" />
            <span className="font-medium">Users</span>
          </Link>
          <Link
            to="/admin/reviews"
            className="flex items-center h-12 px-4 gap-3 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <MdOutlineRateReview className="text-lg" />
            <span className="font-medium">Reviews</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-white h-full p-6 overflow-y-auto rounded-l-2xl shadow-inner">
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-2xl font-semibold text-gray-800">
                Admin Orders
              </h1>
            }
          />
          <Route path="/products" element={<AdminProductsPage />} />
          <Route path="/add-product" element={<AdminAddProductsPage />} />
          <Route path="/update-product" element={<AdminUpdateProductPage />} />
          <Route
            path="/users"
            element={
              <h1 className="text-2xl font-semibold text-gray-800">
                Admin Users
              </h1>
            }
          />
          <Route
            path="/reviews"
            element={
              <h1 className="text-2xl font-semibold text-gray-800">
                Admin Reviews
              </h1>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
