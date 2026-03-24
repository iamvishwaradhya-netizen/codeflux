function detectRecurring(data) {
    const map = {};

    data.forEach(row => {
        const desc = row.Description || row.description || "Unknown";
        const amount = Number(row.Amount || row.amount);

        const key = desc + "_" + amount;

        if (!map[key]) {
            map[key] = {
                merchant: desc,
                amount: amount,
                count: 1
            };
        } else {
            map[key].count++;
        }
    });

    const result = [];

    Object.values(map).forEach(item => {
        if (item.count >= 2 && item.amount < 0) {
            result.push({
                merchant: item.merchant,
                amount: item.amount,
                status: "ACTIVE"
            });
        }
    });

    return result;
}

module.exports = detectRecurring;