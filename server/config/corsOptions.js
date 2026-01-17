const whitelist = [
  "https://www.google.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "https://www.thunderclient.com",
  "http://192.168.137.244:3500",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    // 2. FIX: Add "|| !origin" to allow development/local requests
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
