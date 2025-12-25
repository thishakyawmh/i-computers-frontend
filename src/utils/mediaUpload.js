import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const url = "https://lpzpnohiqprnrbyodfqm.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwenBub2hpcXBybnJieW9kZnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2ODY3NzcsImV4cCI6MjA4MjI2Mjc3N30.85inejmyj5Rl9vs-XOJXdxEH-KL3HXraA5X9ZlOXdR0";
const supabase = createClient(url, key)

export default function uploadFile(file) {

    return new Promise((
        resolve, reject) => {
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name}`;

        supabase.storage.from("images").upload(fileName, file, {
            cacheControl: "3600",
            upsert: false
        })
            .then(
                () => {
                    const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                    resolve(publicUrl)
                }).catch((error) => {
                    reject(error)
                })

    })

}