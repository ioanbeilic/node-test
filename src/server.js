import express, { json } from "express";
import cors from "cors";

import { logger } from "./middleware/logger.middleware";
import { sequelize } from "./database/database";

import UserRoutes from "./routes/user.route";
import FriendshipsRoutes from "./routes/friendship.router";

require("dotenv").config();

(async () => {
  // db
  try {
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();

const app = express();
app.use(cors());
app.use(json());

// middleware
app.use(logger);

// routes

app.use("/users", UserRoutes);
app.use("/friendships", FriendshipsRoutes);
app.get("/", (req, res) => {
  return res.status(200).send("server up and running");
});

app.listen(process.env.PORT, () =>
  console.log(`server running ${process.env.PORT}`)
);
