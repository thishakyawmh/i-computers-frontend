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
          console.log("Products fetched:", response.data);
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
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-headings text-white">Product Management</h2>
      </div>

      <div className="w-full bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {loaded ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#050505] border-b border-white/10 text-xs text-gray-400 font-medium uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Image</th>
                  <th className="px-6 py-4 font-semibold">Product Info</th>
                  <th className="px-6 py-4 font-semibold">Pricing</th>
                  <th className="px-6 py-4 font-semibold">Stock & Category</th>
                  <th className="px-6 py-4 font-semibold">Availability</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                {products.map((item, idx) => (
                  <tr
                    key={item.productID}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 overflow-hidden flex items-center justify-center">
                        {(item.images && item.images.length > 0) ? (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-600 text-xs">No Img</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-white">{item.name}</span>
                        <span className="text-xs text-gray-500 font-mono mt-1">{item.productID}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">LKR {Number(item.price).toLocaleString()}</span>
                        <span className="text-xs text-gray-500 line-through">LKR {Number(item.labelledPrice).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-primary-400 bg-primary-500/10 border border-primary-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{item.stock} Units</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${item.isAvailable
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.isAvailable ? "bg-green-500" : "bg-red-500"}`}></span>
                        {item.isAvailable ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/admin/update-product/`}
                          className="text-white hover:text-primary-400 transition-colors p-2 hover:bg-white/5 rounded-lg"
                          state={item}
                          title="Edit Product"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </Link>
                        <ProductDeleteButton
                          productID={item.productID}
                          onDelete={() => setLoaded(false)}
                        />
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
        className="fixed right-10 bottom-10 w-16 h-16 flex justify-center items-center text-3xl bg-green-600 text-white rounded-full shadow-lg shadow-green-600/40 hover:bg-green-500 hover:scale-110 hover:shadow-glow transition-all duration-300 z-50 border border-white/10"
      >
        <BiPlus />
      </Link>
    </div>
  );
}
