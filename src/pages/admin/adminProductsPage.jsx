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
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products")
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
    <div className="w-full min-h-screen flex justify-center p-10 bg-secondary">
      <div className="w-full max-w-7xl overflow-x-auto shadow-lg rounded-xl bg-primary">
        {loaded ? (
          <table className="min-w-full divide-y divide-gray-200 text-s">
            <thead className="bg-accent text-white text-xs">
              <tr>
                <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide rounded-tl-lg">
                  Image
                </th>
                <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">
                  Product ID
                </th>
                <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">
                  Name
                </th>
                <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">
                  Price
                </th>
                <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">
                  Labelled Price
                </th>
                <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">
                  Category
                </th>
                <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">
                  Brand
                </th>
                <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">
                  Model
                </th>
                <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">
                  Stock
                </th>
                <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">
                  Availability
                </th>
                <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide rounded-tr-lg">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((item, idx) => (
                <tr
                  key={item.productID}
                  className={idx % 2 === 0 ? "bg-secondary" : "bg-primary"}
                >
                  <td className="px-3 py-2">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-3 py-2 font-medium">{item.productID}</td>
                  <td className="px-3 py-2">{item.name}</td>
                  <td className="px-3 py-2">{item.price}</td>
                  <td className="px-3 py-2">{item.labelledPrice}</td>
                  <td className="px-3 py-2">{item.category}</td>
                  <td className="px-3 py-2">{item.brand}</td>
                  <td className="px-3 py-2">{item.model}</td>
                  <td className="px-3 py-2">{item.stock}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${item.isAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {item.isAvailable ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      to={`/admin/update-product/`}
                      className="mr-2 text-white bg-accent px-2 py-1 rounded-md"
                      state={item}
                    > Edit
                    </Link>
                    <ProductDeleteButton
                      productID={item.productID}
                      onDelete={() => setLoaded(false)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loaded />
        )}
      </div>

      <Link
        to="/admin/add-product"
        className="fixed right-8 bottom-8 w-16 h-16 flex justify-center items-center text-4xl bg-accent text-white rounded-full shadow-lg hover:bg-accent-dark transition duration-300"
      >
        <BiPlus />
      </Link>
    </div>
  );
}
