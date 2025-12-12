const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/print", (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: "No content provided" });
    }

    const tempFile = path.join(__dirname, "ticket.txt");
    fs.writeFileSync(tempFile, content, "utf8");

    const cmd = `notepad.exe /p "${tempFile}"`;

    exec(cmd, (err) => {
        if (err) {
            console.error("Error printing:", err);
            return res.status(500).json({ error: "Print failed" });
        }

        res.json({ success: true });
    });
});

app.listen(3001, () => {
    console.log("Ticket Printer Service running on port 3001");
});
