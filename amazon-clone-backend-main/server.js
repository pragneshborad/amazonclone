// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const Products = require("./Products");
// const Users = require("./Users");
// const Orders = require("./Orders");
// const stripe = require("stripe")(
//   "sk_test_51KUDBXSE1AGsrDtwPrEyIlUO6MdKE5YUC77sdqUjLmrwjiEXxcGQPtkEDYlKmlaT6Ll0IIfMtBxaRYoWTEfdXYAh00tng8EKHY"
// );

// const app = express();
// const port = process.env.PORT || 8000;

// // Middlewares
// app.use(express.json());
// app.use(cors());

// // MongoDB connection URL
// const connection_url =
//   "mongodb+srv://Pdpatel267:admin@cluster0.wiq7i.mongodb.net/Cluster0?retryWrites=true&w=majority";

// // Mongoose connection
// mongoose.set("strictQuery", true);
// mongoose.connect(connection_url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // API for home page
// app.get("/", (req, res) => res.status(200).send("Home Page"));

// // Add product
// app.post("/products/add", async (req, res) => {
//   try {
//     const productDetail = req.body;
//     console.log("Product Detail >>>>", productDetail);

//     const newProduct = await Products.create(productDetail);
//     res.status(201).send(newProduct);
//   } catch (err) {
//     console.error("Error adding product:", err.message);
//     res.status(500).send({ message: "Failed to add product" });
//   }
// });

// // Get products
// app.get("/products/get", async (req, res) => {
//   try {
//     const products = await Products.find();
//     res.status(200).send(products);
//   } catch (err) {
//     res.status(500).send({ message: "Failed to fetch products" });
//   }
// });

// // API for SIGNUP
// app.post("/auth/signup", async (req, res) => {
//   const { email, password, fullName } = req.body;

//   try {
//     const user_exist = await Users.findOne({ email: email });
//     if (user_exist) {
//       return res.send({ message: "The Email is already in use!" });
//     }

//     const encrypt_password = await bcrypt.hash(password, 10);
//     const userDetail = {
//       email: email,
//       password: encrypt_password,
//       fullName: fullName,
//     };

//     const newUser = await Users.create(userDetail);
//     res.status(201).send({ message: "User Created Successfully", user: newUser });
//   } catch (err) {
//     res.status(500).send({ message: "Signup failed" });
//   }
// });

// // API for LOGIN
// app.post("/auth/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userDetail = await Users.findOne({ email: email });

//     if (userDetail) {
//       const isPasswordValid = await bcrypt.compare(password, userDetail.password);
//       if (isPasswordValid) {
//         res.status(200).send(userDetail);
//       } else {
//         res.status(401).send({ error: "Invalid Password" });
//       }
//     } else {
//       res.status(404).send({ error: "User does not exist" });
//     }
//   } catch (err) {
//     res.status(500).send({ message: "Login failed" });
//   }
// });

// // API for PAYMENT
// app.post("/payment/create", async (req, res) => {
//   const total = req.body.amount;
//   console.log("Payment Request received for this amount (INR):", total);

//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount: total * 100, // Stripe works with the smallest currency unit
//       currency: "inr",
//     });

//     res.status(201).send({
//       clientSecret: payment.client_secret,
//     });
//   } catch (err) {
//     res.status(500).send({ message: "Payment failed" });
//   }
// });

// // API to add ORDER DETAILS
// app.post("/orders/add", async (req, res) => {
//   const { basket, price, email, address } = req.body;

//   try {
//     const orderDetail = {
//       products: basket,
//       price: price,
//       address: address,
//       email: email,
//     };

//     const newOrder = await Orders.create(orderDetail);
//     console.log("Order added to database >>", newOrder);
//     res.status(201).send(newOrder);
//   } catch (err) {
//     res.status(500).send({ message: "Order creation failed" });
//   }
// });

// // API to get ORDER DETAILS
// app.post("/orders/get", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const orders = await Orders.find({ email: email });
//     res.status(200).send(orders);
//   } catch (err) {
//     res.status(500).send({ message: "Failed to fetch orders" });
//   }
// });

// // Start the server
// app.listen(port, () => console.log(`Server is listening on port ${port}`));
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Products = require("./Products");
const Users = require("./Users");
const Orders = require("./Orders");
const stripe = require("stripe")(
  "sk_test_51KUDBXSE1AGsrDtwPrEyIlUO6MdKE5YUC77sdqUjLmrwjiEXxcGQPtkEDYlKmlaT6Ll0IIfMtBxaRYoWTEfdXYAh00tng8EKHY"
);

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB connection URL
const connection_url =
  "mongodb+srv://Pdpatel267:admin@cluster0.wiq7i.mongodb.net/Cluster0?retryWrites=true&w=majority";

// Mongoose connection
mongoose.set("strictQuery", true);
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API for home page
app.get("/", (req, res) => res.status(200).send("Home Page"));

// Add product
app.post("/products/add", async (req, res) => {
  try {
    const productDetail = req.body;
    console.log("Product Detail >>>>", productDetail);

    // Save product to database
    const newProduct = await Products.create(productDetail);
    res.status(201).send(newProduct);
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(500).send({ message: "Failed to add product" });
  }
});

// Get products
app.get("/products/get", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch products" });
  }
});

// API for SIGNUP
app.post("/auth/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    const user_exist = await Users.findOne({ email: email });
    if (user_exist) {
      return res.send({ message: "The Email is already in use!" });
    }

    const encrypt_password = await bcrypt.hash(password, 10);
    const userDetail = {
      email: email,
      password: encrypt_password,
      fullName: fullName,
    };

    const newUser = await Users.create(userDetail);
    res.status(201).send({ message: "User Created Successfully", user: newUser });
  } catch (err) {
    res.status(500).send({ message: "Signup failed" });
  }
});

// API for LOGIN
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDetail = await Users.findOne({ email: email });

    if (userDetail) {
      const isPasswordValid = await bcrypt.compare(password, userDetail.password);
      if (isPasswordValid) {
        res.status(200).send(userDetail);
      } else {
        res.status(401).send({ error: "Invalid Password" });
      }
    } else {
      res.status(404).send({ error: "User does not exist" });
    }
  } catch (err) {
    res.status(500).send({ message: "Login failed" });
  }
});

// API for PAYMENT
app.post("/payment/create", async (req, res) => {
  const total = req.body.amount;
  console.log("Payment Request received for this amount (INR):", total);

  try {
    const payment = await stripe.paymentIntents.create({
      amount: total * 100, // Stripe works with the smallest currency unit
      currency: "inr",
    });

    res.status(201).send({
      clientSecret: payment.client_secret,
    });
  } catch (err) {
    res.status(500).send({ message: "Payment failed" });
  }
});

// API to add ORDER DETAILS
app.post("/orders/add", async (req, res) => {
  const { basket, price, email, address } = req.body;

  try {
    const orderDetail = {
      products: basket, // Ensure basket is an array of products
      price: price,
      address: address,
      email: email,
    };

    const newOrder = await Orders.create(orderDetail);
    console.log("Order added to database >>", newOrder);
    res.status(201).send(newOrder);
  } catch (err) {
    res.status(500).send({ message: "Order creation failed" });
  }
});

// API to get ORDER DETAILS
app.post("/orders/get", async (req, res) => {
  const { email } = req.body;

  try {
    const orders = await Orders.find({ email: email });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch orders" });
  }
});

// Start the server
app.listen(port, () => console.log(`Server is listening on port ${port}`));
