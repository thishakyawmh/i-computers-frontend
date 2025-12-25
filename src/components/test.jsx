import { useState } from "react";
import createClient from "@supabase/supabase-js";

export default function Test() {
    const [file, setFile] = useState(null);
    function handleUpload() {
        console.log(file)
    }
    const url = "https://lpzpnohiqprnrbyodfqm.supabase.co";
    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwenBub2hpcXBybnJieW9kZnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2ODY3NzcsImV4cCI6MjA4MjI2Mjc3N30.85inejmyj5Rl9vs-XOJXdxEH-KL3HXraA5X9ZlOXdR0";
    const supabase = createClient()
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