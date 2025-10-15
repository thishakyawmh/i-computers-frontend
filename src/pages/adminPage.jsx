import { Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full h-full max-h-full bg-secondary flex ">
            <div className="w-[300px] h-full bg-secondary">
                <div className="w-full h-[100px]  text-black flex items-center m-[10px]">
                    <img src="/logo.png" alt="Logo" className="h-full" />
                    <h1 className="text-xl m-[20px]">Admin</h1>
                </div>
                <div  className="w-full h-[400px] bg-white flex flex-col text-black">
                    <a href="/admin">Orders</a>
                    <a href="/admin/products">Products</a>
                    <a href="/admin/users">Users</a>
                    <a href="/admin/reviews">Reviews</a>

                </div>

            </div>
            <div className="w-[calc(100%-300px)] text-black bg-primary h-full max-h-full border-[10px] border-primary  overflow-y-scroll text-1xl">
                <Routes path="/">
                  <Route path="/" element={<h1>Admin Orders</h1>}/>
                  <Route path="/products" element={<h1>Admin Products</h1>}/>
                  <Route path="/users" element={<h1>Admin Users</h1>}/>
                  <Route path="/reviews" element={<h1>Admin Reviews</h1>}/>  

                </Routes>
            </div>

            
        </div>
    )
}