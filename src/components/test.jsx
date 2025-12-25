import { useState } from "react";
import uploadFile from "../utils/mediaUpload";

export default function Test() {
    const [file, setFile] = useState(null);
    async function handleUpload() {
        const url = await uploadFile(file)
        console.log(url)
    }
    return (
        <div className="w-full h-full flex items-center justify-center">
            <input type="file" onChange={
                (e) => {
                    setFile(e.target.files[0])
                }
            } />
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                    handleUpload()
                }}
            >Upload</button>
        </div>
    )
}