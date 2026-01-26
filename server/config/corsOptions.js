const whitelist = [
  // "https://www.google.com",
  // "http://127.0.0.1:5500",
  // "http://localhost:3500",
  // "https://www.thunderclient.com",
  // "http://192.168.137.244:3500",
  "http://localhost:5173",
  // "http://192.168.137.244:5173",
  "https://chillandthrive.netlify.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // <--- THIS LINE IS MISSING. ADD IT HERE.
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
