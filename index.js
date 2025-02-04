const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

//routes

const CustomerRoutes = require("./routes/CusotmerRoute");
const ProductRoutes = require("./routes/ProductRoute");
const OrderRoutes = require("./routes/OrderRoute");
const UserRoutes = require("./routes/UserRoute");
const PaymentRoutes = require("./routes/PaymentRoute");

//close routes

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("api/v1/customer", CustomerRoutes);
app.use("api/v1/product", ProductRoutes);
app.use("api/v1/order", OrderRoutes);
app.use("api/v1/user", UserRoutes);
app.use("api/v1/payment", PaymentRoutes);

app.listen(PORT || 3000, () => {
  console.log(`server is running on port ${process.env.PORT || 3000}`);
});
