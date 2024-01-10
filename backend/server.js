const express = require("express");
const app = new express();
const router = require("./routes");
const connection = require("./models").connection;



const PORT = 8080;

app.use(express.json());

app.get("/api/reset", (req, res) => {
    connection
      .sync({ force: true })
      .then(() => {
        res.status(201).send({ message: "Database reset" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Database reset failed",
          err: err.message,
        });
      });
  });
  
app.use('/api', router);


app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
