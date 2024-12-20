const express = require("express");
const indexRouter = require("./routes/indexRouter");
const bodyParser = require("body-parser");
const cors = require("cors")

require("dotenv").config();

require("./configs/db");

const app = express();
const port = 3001;

app.use(bodyParser.json({limit: '10mb'}));
app.use(cors());

app.use("/api", indexRouter);

app.listen(port, ()=>console.log(`Server is running on port ${port}`));