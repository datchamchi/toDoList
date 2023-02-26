const mongoose = require("mongoose");
const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const database = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(database, (err) => {
  if (!err) console.log("Database connect succesfully !!!");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server starting...");
  console.log(process.env.NODE_ENV);
});
