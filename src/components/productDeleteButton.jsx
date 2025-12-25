import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductDeleteButton(props) {
  const productID = props.productID;
  const reload = props.reload;
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const token = localStorage.getItem("token");
    const url =
      import.meta.env.VITE_BACKEND_URL +
      "/products/" +
      productID;

    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product deleted successfully");
      setIsDeleting(false);
      setIsMessageOpen(false);

      if (typeof reload === "function") {
        reload();
      } else {
        window.location.reload();
      }
    } catch (err) {
      toast.error("Failed to delete product");
      console.error("Delete error:", err);
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setIsMessageOpen(true);
        }}
        className="w-20 bg-red-600 text-white font-semibold py-1 rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
      >
        Delete
      </button>
      {isMessageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setIsMessageOpen(false)}
              aria-label="Close"
              className="absolute -top-3 -right-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 border border-gray-200 text-gray-700 shadow hover:scale-105 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Delete product
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                This action cannot be undone. Are you sure you want to delete
                the product
                <span className="ml-2 inline-block px-2 py-1 text-sm font-medium bg-red-50 text-red-700 rounded">
                  {productID}
                </span>
                ?
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsMessageOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleDelete()}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
