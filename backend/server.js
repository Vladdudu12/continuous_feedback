const express = require("express");
const app = new express();
const router = require("./routes");
const cors = require('cors');
const dotenv = require('dotenv');

const PORT = 8080;
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api', router);


app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
