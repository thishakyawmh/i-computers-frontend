import { useEffect, useState } from "react";
import axios from "axios";
import Loaded from "../components/loaded";
import ProductCard from "../components/productCard";

export default function ProductPage() {
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
        }
    }, []);
    return (
        <div className="w-full h-[calc(100vh-100px)]">
            {!loaded ? <Loaded /> :
                <div className="w-full h-full flex flex-wrap justify-center items-start pt-10">
                    {products.map((product) => (
                        <ProductCard key={product.productID} product={product} />
                    ))}
                </div>
            }
        </div>
    );
}
