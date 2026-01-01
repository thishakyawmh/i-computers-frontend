import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loaded from "../../components/loaded";
import ProductDeleteButton from "../../components/productDeleteButton";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          setProducts(response.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          toast.error("Failed to load products");
        });
    }
  }, [loaded]);

  return (
    <div className="w-full relative px-0 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-headings text-white">Product Management</h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 uppercase tracking-widest font-bold font-mono">Inventory & Catalog control</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="bg-surface px-4 py-2 rounded-xl border border-white/10 uppercase tracking-widest font-bold">
            Total SKU: <span className="text-white">{products.length}</span>
          </span>
        </div>
      </div>

      <div className="w-full bg-surface border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
        {loaded ? (
          <div className="w-full overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#050505] border-b border-white/10 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                <tr>
                  <th className="px-6 py-5">Item</th>
                  <th className="px-6 py-5">Product Details</th>
                  <th className="px-6 py-5 hidden sm:table-cell">Finance</th>
                  <th className="px-6 py-5 hidden md:table-cell">Inventory</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs sm:text-sm text-gray-400">
                {products.map((item) => (
                  <tr key={item.productID} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-lg border border-white/10 overflow-hidden flex items-center justify-center flex-shrink-0">
                        {(item.images && item.images.length > 0) ? (
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <span className="text-gray-700 text-[10px] font-bold">ICM</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col max-w-[150px] sm:max-w-none">
                        <span className="font-bold text-white truncate">{item.name}</span>
                        <span className="text-[10px] text-gray-600 font-mono mt-0.5 uppercase tracking-tighter truncate">{item.productID}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 hidden sm:table-cell">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-200">LKR {Number(item.price).toLocaleString()}</span>
                        <span className="text-[10px] text-gray-600 line-through">LKR {Number(item.labelledPrice).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 hidden md:table-cell whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-primary-400 bg-primary-500/5 px-2 py-0.5 rounded border border-primary-500/10 inline-block w-fit font-bold uppercase tracking-widest text-center">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.stock} Units</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-current ${item.isAvailable ? "text-green-400 bg-green-500/5" : "text-red-400 bg-red-500/5"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.isAvailable ? "bg-green-500" : "bg-red-500"}`}></span>
                        {item.isAvailable ? "Active" : "Legacy"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5 sm:gap-3">
                        <Link
                          to={`/admin/update-product/`}
                          className="text-gray-500 hover:text-primary-400 transition-colors p-2 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5"
                          state={item}
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </Link>
                        <ProductDeleteButton productID={item.productID} onDelete={() => setLoaded(false)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full h-80 flex items-center justify-center">
            <Loaded />
          </div>
        )}
      </div>

      <Link
        to="/admin/add-product"
        className="fixed right-6 sm:right-10 bottom-6 sm:bottom-10 w-14 h-14 sm:w-16 sm:h-16 flex justify-center items-center text-2xl sm:text-3xl bg-green-600 text-white rounded-2xl sm:rounded-full shadow-lg shadow-green-900/40 hover:bg-green-500 hover:scale-110 hover:shadow-glow transition-all duration-300 z-50 border border-white/10"
      >
        <BiPlus />
      </Link>
    </div>
  );
}
