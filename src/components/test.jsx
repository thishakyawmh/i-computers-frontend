import { useState } from "react";

export default function Test() {

    const [count, setCount] = useState(0);
    const [status, setStatus] = useState("😉");

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-[420px] h-[300px] shadow-lg rounded-lg flex justify-center items-center bg-white">

                <button className="w-[110px] h-[50px] bg-red-500 text-white rounded-md" 
                onClick={()=>{
                    setCount(count - 1);
                    console.log(count);
                }}>
                    Decrement
                </button>

                <h1 className="w-[120px] h-[50px] text-[30px] text-center font-mono">{count}</h1>

                <button className="w-[110px] h-[50px] bg-blue-500 text-white rounded-md"
                onClick={()=>{
                    setCount(count + 1);
                    console.log(count);
                }}>
                    Increment
                </button>

            </div>

            <div className="w-[420px] h-[300px] shadow-lg rounded-lg flex justify-center items-center flex-col bg-white mt-6">
                <span className="h-[30px] font-bold mb-12 text-6xl">
                    {status}
                </span>
                <div className="w-full h-[50px] justify-center items-center flex">
                    <button className="w-[110px] h-full bg-red-500 text-white font-bold m-4 rounded-md" 
                    onClick={()=>{
                        setStatus("🌚")
                    }}>OFF</button>
                    <button className="w-[110px] h-full bg-green-500 text-white font-bold m-4 rounded-md"
                    onClick={()=>{
                        setStatus("🌞")
                    }}>ON</button>

                </div>
            </div>

        </div>
    )
}