import axios from "axios";
import { use, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

const products = [
  {
    productID: "PRD001",
    name: "Logitech MX Master 3S Wireless Mouse",
    altName: ["MX Master 3S", "Logitech Wireless Mouse"],
    description:
      "A high-performance wireless mouse with advanced ergonomic design, silent clicks, and customizable buttons. Perfect for productivity and creativity.",
    price: 29900,
    labelledPrice: "Rs. 29,900",
    images: [
      "https://example.com/images/mx-master-3s-front.jpg",
      "https://example.com/images/mx-master-3s-side.jpg",
    ],
    category: "Mouse",
    model: "MX Master 3S",
    brand: "Logitech",
    stock: 25,
    isAvailable: true,
  },
  {
    productID: "PRD002",
    name: "Corsair K70 RGB Mechanical Keyboard",
    altName: ["K70 RGB", "Corsair Gaming Keyboard"],
    description:
      "Mechanical gaming keyboard featuring per-key RGB backlighting, durable aluminum frame, and Cherry MX Red switches for smooth, fast keystrokes.",
    price: 38500,
    labelledPrice: "Rs. 38,500",
    images: [
      "https://example.com/images/k70-rgb-top.jpg",
      "https://example.com/images/k70-rgb-side.jpg",
    ],
    category: "Keyboard",
    model: "K70 RGB",
    brand: "Corsair",
    stock: 18,
    isAvailable: true,
  },
  {
    productID: "PRD003",
    name: "Razer BlackShark V2 Gaming Headset",
    altName: ["BlackShark V2", "Razer Headphones"],
    description:
      "Premium gaming headset with THX 7.1 surround sound, memory foam ear cushions, and detachable noise-canceling mic for immersive gaming sessions.",
    price: 27900,
    labelledPrice: "Rs. 27,900",
    images: [
      "https://example.com/images/blackshark-v2-front.jpg",
      "https://example.com/images/blackshark-v2-side.jpg",
    ],
    category: "Headset",
    model: "BlackShark V2",
    brand: "Razer",
    stock: 30,
    isAvailable: true,
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((response) => {
    console.log(response.data);
    setProducts(response.data);
  });

  return (
    <div className="w-full max-h-full flex justify-center p-10 relative">
      <table>
        <thead className="h-[100px]">
          <tr>
            <th>Image</th>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Labelled Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Stock</th>
            <th>Availability</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => {
            return (
              <tr key={item.productID}>
                <td>
                  <img src={item.images[0]} className="w-[30px] h-[30px]" />
                </td>
                <td>{item.productID}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.labelledPrice}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.stock}</td>
                <td>{item.isAvailable ? "In Stock" : "Out of Stock"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Link
        to="/admin/add-product"
        className="p-[8px] absolute right-[20px] bottom-[20px] w-[50px] h-[50px] flex justify-center items-center text-7xl border-[2px] rounded-full hover:text-white hover-bg-accent"
      >
        <BiPlus />
      </Link>
    </div>
  );
}
