import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const app = express();
// Use cors middleware
app.use(cors());

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/meals", async (req, res) => {
  const meals = await fs.readFile("./data/available-meals.json", "utf8");
  res.json(JSON.parse(meals));
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (
    orderData === null ||
    orderData.items === null ||
    orderData.items.length === 0 // Fix: Use .length instead of checking against []
  ) {
    return res.status(400).json({ message: "Missing data." });
  }

  // Other validation checks...

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile("./data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));
  res.status(201).json({ message: "Order created!" });
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
