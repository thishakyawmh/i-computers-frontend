import { Route, Routes } from "react-router-dom";
import Header from "../components/header";

export default function HomePage(){
    return(
        <div className="w-full h-full text-gray-800 bg-gray-50 min-h-screen">
            <Header />
            <div className="w-full min-h-[calc(100%-100px)] overflow-y-scroll p-6">
                <Routes>
                    <Route path="/" element={<h1 className="text-2xl font-semibold">Home Page</h1>}/>
                    <Route path="/products" element={<h1 className="text-2xl font-semibold">Products Page</h1>}/>
                    <Route path="/about" element={<h1 className="text-2xl font-semibold">About Page</h1>}/>
                    <Route path="/contact" element={<h1 className="text-2xl font-semibold">Contact Page</h1>}/>
                    <Route path="*" element={<h1 className="text-2xl font-semibold">Page Not Found</h1>}/>

                </Routes>

            </div>


        </div>
    );
}