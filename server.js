const express = require("express");
const { connect } = require("./connection");
const Url = require("./models/url");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  checkForUserAuthentication,
  roleRestrictedUser,
} = require("./middleware/auth");

const staticRoute = require("./routes/static");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

const app = express();
dotenv.config();
const PORT = 5000;

// connect to mongodb
connect(process.env.MONGODB_URL).then(() =>
  console.log("Connected to MongoDB")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForUserAuthentication);

app.use("/url", roleRestrictedUser(["ADMIN", "USER"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const urlEntry = await Url.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(urlEntry?.redirectUrl);
});

app.listen(PORT, () => console.log(`Server is listening at Port ${PORT}`));
