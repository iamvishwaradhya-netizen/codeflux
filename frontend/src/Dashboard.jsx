import { useState, useEffect } from "react";

export default function Dashboard({ data, setData }) {

    const [showReminders, setShowReminders] = useState(false);
    const [renewalMap, setRenewalMap] = useState({});

    // ✅ Generate stable renewal days ONLY ONCE
     useEffect(() => {
    const map = {};

    data.forEach((item, i) => {
        // Force first 2 items urgent
        if (i < 2) {
            map[i] = Math.floor(Math.random() * 3) + 1; // 1–3 days
        } else {
            map[i] = Math.floor(Math.random() * 30) + 1;
        }
    });

    setRenewalMap(map);
}, [data.length]);

    // ✅ Cancel only clicked item
    const cancel = (index) => {
        const updated = data.map((item, i) =>
            i === index
                ? { ...item, status: "CANCELLED" }
                : item
        );
        setData(updated);
    };

    // 🤖 Auto Cancel (<= 2 days)
    const autoCancel = () => {
    const updated = data.map((item, i) => {
        const days = renewalMap[i];

        if (days <= 5 && item.status === "ACTIVE") {
            return { ...item, status: "CANCELLED (AUTO)" };
        }
        return item;
    });

    setData(updated);
};

    // 💰 Totals
    const total = data
        .filter(item => item.status === "ACTIVE")
        .reduce((sum, item) => sum + Math.abs(Number(item.amount)), 0);

    const yearly = total * 12;

    // 🧠 Category detection
    const getCategory = (merchant) => {
        if (!merchant) return "📦 Other";

        const name = merchant.toLowerCase();

        if (name.includes("netflix") || name.includes("prime") || name.includes("hotstar"))
            return "🎬 Entertainment";

        if (name.includes("spotify") || name.includes("youtube"))
            return "🎵 Music";

        if (name.includes("swiggy") || name.includes("zomato"))
            return "🍔 Food";

        if (name.includes("uber") || name.includes("ola"))
            return "🚕 Transport";

        return "📦 Other";
    };

    // 🔔 Renewal text
    const getRenewalText = (days) => {
        if (days <= 2) return `🚨 Due in ${days} days`;
        if (days <= 5) return `⚠️ Expiring in ${days} days`;
        return `⏳ ${days} days left`;
    };

    // 🔥 PRIORITY REMINDERS (SORTED)
    const expiring = data
        .map((item, i) => ({
            ...item,
            days: renewalMap[i] || 30
        }))
        .filter(item => item.status === "ACTIVE")
        .sort((a, b) => a.days - b.days)
        .slice(0, 5);

    return (
        <div style={{
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
            padding: "20px"
        }}>

            {/* 🔥 HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>💰 Smart Subscription Tracker</h1>

                <div>
                    <button
                        onClick={() => setShowReminders(!showReminders)}
                        style={{
                            fontSize: "20px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            marginRight: "10px"
                        }}
                    >
                        🔔
                    </button>

                    <button
                        onClick={autoCancel}
                        style={{
                            background: "black",
                            color: "white",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        🤖 Auto Cancel
                    </button>
                </div>
            </div>

            {/* 🔔 REMINDER POPUP */}
            {showReminders && (
                <div style={{
                    background: "white",
                    padding: "15px",
                    margin: "10px 0",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                }}>
                    <h3>⚠️ Expiring Soon</h3>

                    {expiring.length === 0 ? (
                        <p>No subscriptions expiring soon</p>
                    ) : (
                        expiring.map((item, i) => (
                            <p key={i}>
                                {item.merchant || item.description} — {getRenewalText(item.days)}
                            </p>
                        ))
                    )}
                </div>
            )}

            {/* 💰 SUMMARY */}
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "20px 0"
            }}>
                <div style={{ background: "white", padding: "15px", borderRadius: "10px" }}>
                    <h3>Monthly Loss</h3>
                    <p style={{ color: "red" }}>₹ {total}</p>
                </div>

                <div style={{ background: "white", padding: "15px", borderRadius: "10px" }}>
                    <h3>Yearly Loss</h3>
                    <p style={{ color: "darkred" }}>₹ {yearly}</p>
                </div>
            </div>

            <h2>Subscriptions</h2>

            {data.length === 0 ? (
                <p>No subscriptions found</p>
            ) : (
                data.map((item, i) => {
                    const days = renewalMap[i] || 10;

                    return (
                        <div key={i} style={{
                            background: "white",
                            padding: "15px",
                            margin: "10px 0",
                            borderRadius: "10px"
                        }}>
                            <h3>{item.merchant || item.description || "Unknown"}</h3>

                            <p style={{ color: "gray" }}>
                                {getCategory(item.merchant || item.description)}
                            </p>

                            <p>₹ {Math.abs(item.amount)} / month</p>

                            <p style={{ color: "blue" }}>
                                {getRenewalText(days)}
                            </p>

                            <p style={{
                                color: item.status === "ACTIVE" ? "green" : "gray"
                            }}>
                                {item.status}
                            </p>

                            {item.status === "ACTIVE" && (
                                <button
                                    onClick={() => cancel(i)}
                                    style={{
                                        backgroundColor: "red",
                                        color: "white",
                                        padding: "5px 10px",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    );
                })
            )}

        </div>
    );
}