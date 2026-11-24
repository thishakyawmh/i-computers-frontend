import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export default async function uploadFile(file) {
    if (!supabase) {
        throw new Error("Supabase storage is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
    }

    if (!(file instanceof File) || !file.type.startsWith("image/")) {
        throw new Error("Please select a valid image file.");
    }

    if (file.size <= 0 || file.size > MAX_IMAGE_SIZE_BYTES) {
        throw new Error("Image files must be smaller than 5 MB.");
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
    const fileName = `${crypto.randomUUID()}-${safeName}`;

    const { error } = await supabase.storage
        .from("images")
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type
        });

    if (error) {
        throw new Error(`Image upload failed: ${error.message}`);
    }

    const { data } = supabase.storage.from("images").getPublicUrl(fileName);
    if (!data?.publicUrl) {
        throw new Error("Supabase did not return a public image URL.");
    }

    return data.publicUrl;
}
