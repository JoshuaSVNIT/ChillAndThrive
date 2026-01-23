require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const {
  logger,
  logEvents,
  safetyNetLogger,
} = require("./middleware/LogEvents");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3500;
console.log(process.env.NODE_ENV);

connectDB();
//----------------------------------------------------------------------------------------------------------------------
// since the first argument is not given the app.use will execute the callback function for every request
app.use(logger);

//------------------------------------------------------------------------------------------
app.use(cors(corsOptions));
//-------------------------------------------------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./routes/root"));
// app.use("/subdirectory", require("./routes/subdirectory"));
app.use("/register", require("./routes/apis/register"));
app.use("/auth", require("./routes/apis/auth"));
app.use("/refresh", require("./routes/apis/refresh"));
app.use("/users", require("./routes/apis/users"));
app.use("/logout", require("./routes/apis/logout"));
app.use("/bookings", require("./routes/apis/booking"));
app.get("/admin", (req, res) => {
  res.redirect("https://chill-and-thrive-admin.sanity.studio/");
});

app.use("/services", require("./routes/apis/CMS/services"));
app.use("/testimonials", require("./routes/apis/CMS/testimonials"));
app.use("/events", require("./routes/apis/CMS/events"));
app.use("/feedback", require("./routes/apis/CMS/feedback"));

// app.use("/employees", require("./routes/apis/employees"));

app.all(/(.*)/, (req, res) => {
  res.status(404);
  //   if (req.accepts("html")) {
  //     res.sendFile(path.join(__dirname, "htmls", "404.html"));
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

//----------------------------------------------------------------------------------------------------------------------
app.use(safetyNetLogger);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  LogEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log",
  );
});
