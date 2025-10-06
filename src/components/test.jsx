import { useState } from "react";

export default function Test() {

    const [count, setCount] = useState(0);
    const [status, setStatus] = useState("😉");

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-[400px] h-[300px] shadow-2xl flex justify-center items-center">

                <button className="w-[100px] h-[50px] bg-red-600 text-white" 
                onClick={()=>{
                    setCount(count - 1);
                    console.log(count);
                }}>
                    Decrement
                </button>

                <h1 className="w-[100px] h-[50px] text-[30px] text-center">{count}</h1>

                <button className="w-[100px] h-[50px] bg-blue-600 text-white"
                onClick={()=>{
                    setCount(count + 1);
                    console.log(count);
                }}>
                    Increment
                </button>

            </div>

            <div className="w-[400px] h-[300px] shadow-2xl flex justify-center items-center flex-col">
                <span className="h-[30px] font-bold mb-20 text-6xl">
                    {status}
                </span>
                <div className="w-full h-[50px] justify-center items-center flex">
                    <button className="w-[100px] h-full bg-red-600 text-white font-bold m-4" 
                    onClick={()=>{
                        setStatus("🌚")
                    }}>OFF</button>
                    <button className="w-[100px] h-full bg-green-600 text-white font-bold m-4"
                    onClick={()=>{
                        setStatus("🌞")
                    }}>ON</button>

                </div>
            </div>

        </div>
    )
}