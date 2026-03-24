const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");
const detectRecurring = require("./detect");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            const subscriptions = detectRecurring(results);
            res.json({ subscriptions });
        });
});

app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});