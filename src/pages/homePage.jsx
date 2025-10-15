import { Route, Routes } from "react-router-dom";
import Header from "../components/header";

export default function HomePage(){
    return(
        <div className="w-full h-full text-black">
            <Header />
            <div className="w-full min-h-[calc(100%-100px)] overflow-y-scroll">
                <Routes>
                    <Route path="/" element={<h1>Home Page</h1>}/>
                    <Route path="/products" element={<h1>Products Page</h1>}/>
                    <Route path="/about" element={<h1>About Page</h1>}/>
                    <Route path="/contact" element={<h1>Contact Page</h1>}/>
                    <Route path="*" element={<h1>Page Not Found</h1>}/>

                </Routes>

            </div>


        </div>
    );
}