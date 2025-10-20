import { Link, Route, Routes } from "react-router-dom";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsBoxes } from "react-icons/bs";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineRateReview } from "react-icons/md";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductsPage from "./admin/adminAddProductPage";



export default function AdminPage(){
    return(
        <div className="w-full h-full max-h-full flex bg-gray-50">
            <aside className="w-[300px] h-full bg-gray-100 shadow-inner">
                <div className="w-full h-[100px] text-gray-800 flex items-center px-4">
                    <img src="/logo.png" alt="Logo" className="h-12" />
                    <h1 className="text-xl ml-4 font-semibold">Admin</h1>
                </div>
                <nav className="w-full h-[400px] bg-gray-100 flex flex-col text-gray-700">
                    <Link to="/admin" className="w-full flex items-center h-12 gap-3 px-4 hover:bg-gray-200"> <HiOutlineClipboardList className="text-lg"/> <span>Orders</span></Link>
                    <Link to="/admin/products" className="w-full flex items-center h-12 gap-3 px-4 hover:bg-gray-200"> <BsBoxes className="text-lg"/> <span>Products</span></Link>
                    <Link to="/admin/users" className="w-full flex items-center h-12 gap-3 px-4 hover:bg-gray-200"> <LuUsersRound className="text-lg"/> <span>Users</span></Link>
                    <Link to="/admin/reviews" className="w-full flex items-center h-12 gap-3 px-4 hover:bg-gray-200"> <MdOutlineRateReview className="text-lg"/> <span>Reviews</span></Link>
                </nav>

            </aside>
            <main className="w-[calc(100%-300px)] text-gray-800 bg-white h-full max-h-full p-6 overflow-y-scroll rounded-l-2xl">
                <Routes path="/">
                  <Route path="/" element={<h1 className="text-2xl font-semibold">Admin Orders</h1>}/>
                  <Route path="/products" element={<AdminProductsPage/>}/>
                  <Route path="/add-product" element={<AdminAddProductsPage/>}/>
                  <Route path="/users" element={<h1 className="text-2xl font-semibold">Admin Users</h1>}/>
                  <Route path="/reviews" element={<h1 className="text-2xl font-semibold">Admin Reviews</h1>}/>  

                </Routes>
            </main>

        </div>
    )
}