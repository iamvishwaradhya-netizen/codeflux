import { useState } from "react";
import Upload from "./Upload";
import Dashboard from "./Dashboard";

export default function App() {
    const [data, setData] = useState([]);

    return (
        <div>
<h1 style={{ textAlign: "center" }}>
    💰 Smart Subscription Tracker
</h1>

            <Upload setData={setData} />
            <Dashboard data={data} setData={setData} />
        </div>
    );
}