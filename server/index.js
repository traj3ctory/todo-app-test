const express = require("express");
const app = express();
const port = 7005;
const cors = require("cors");
const route = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", route);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
