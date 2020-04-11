const express = require("express");

const app = express();

const PORT = process.env.PORT || 500;

app.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}`);
});
