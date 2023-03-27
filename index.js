const express = require("express");
const routes = require("./routes/index");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.use(express.static("public"));
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The app is running and listening to localhost: ${PORT}`);
});