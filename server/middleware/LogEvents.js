const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsP = require("fs").promises;
const path = require("path");
const logEvents = async (message, logFile) => {
  const dateTime = `${format(new Date(), "dd-MM-yyyy\tHH:mm:ss")}`;
  const logmessage = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "ErrorLogs"))) {
      await fsP.mkdir(path.join(__dirname, "..", "ErrorLogs"));
    }

    await fsP.appendFile(
      path.join(__dirname, "..", "ErrorLogs", logFile),
      logmessage
    );
  } catch (error) {
    console.error(error);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};

const safetyNetLogger = (err, req, res, next) => {
  logEvents(`${err.name}:  ${err.message}`, "errLogSafetyNet.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = { logger, logEvents, safetyNetLogger };
