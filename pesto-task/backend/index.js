const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
dotenv.config();
dotenv.config({ path: "static.env" });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  credentials: true,
  origin: process.env.CORS_ORIGIN,
};
app.use(cors(corsOptions));

const port = process.env.PORT;
const mongodb_url = process.env.MONGODB_URL;

// Connect to mongoDB
mongoose
  .connect(mongodb_url, {
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("Error in database: " + err);
  });

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongodb_url }),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Routes
app.use("/", require("./routes/routes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Starts the server
app.listen(port, () => {
  console.log("Sever started listening on", port);
});

module.exports = app;
