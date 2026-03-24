import { useState } from "react";
import { uploadFile } from "./api";

export default function Upload({ setData }) {
    const [file, setFile] = useState(null);

 const handleUpload = async () => {
    if (!file) {
        alert("Select CSV file first");
        return;
    }

    console.log("Uploading:", file);

    try {
        const data = await uploadFile(file);
        console.log("Response:", data);

        setData(data.subscriptions || []);
    } catch (err) {
        console.error(err);
        alert("Upload failed");
    }
};
    return (
        <div style={{ margin: "20px" }}>
 <input 
    type="file" 
    accept=".csv"
    onChange={(e) => setFile(e.target.files[0])}
/>

            <button onClick={handleUpload}>
                Upload
            </button>
        </div>
    );
}