import dotenv from "dotenv";
import app from "./app.js";

import connectDb from "./config/dbConnection.js";

dotenv.config()

connectDb();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
