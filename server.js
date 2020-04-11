const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database

connectDB();

//test route
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Welcome to contact keeping Api" });
});

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}`);
});
