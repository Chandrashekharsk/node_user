const express = require("express");
const connectDB = require("./dbConfig");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const app = express();
require("dotenv").config();
connectDB();

// body parser
app.use(express.json())


app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
