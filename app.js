import express from "express"

import errorHandler from "./middleware/errorHandler.js";
import contactRouter from "./routes/contactRoutes.js"
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/contacts", contactRouter)
app.use("/api/users", userRouter);
app.use(errorHandler);

export default app;