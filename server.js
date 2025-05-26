const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let latestSurvey = null;

// Endpoint to receive survey JSON
app.post("/api/survey", (req, res) => {
    latestSurvey = req.body;
    console.log("Received survey JSON:", latestSurvey);
    res.json({ status: "ok" });
});

// Endpoint for the React UI app to fetch the latest survey JSON
app.get("/api/survey", (req, res) => {
    if (latestSurvey) {
        res.json(latestSurvey);
    } else {
        res.status(404).json({ error: "No survey found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});