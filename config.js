const DB_PATH = process.env.DB_PATH || "mongodb://localhost/se-project";

const DB_OPTIONS = { // Solve deprecated warnings
  useNewUrlParser: true,
  useCreateIndex: true
};

const PORT = process.env.PORT || 3000;

const SERVER_PATH = process.env.SERVER_PATH || `http://localhost:${PORT}`;

const JWT_KEY = process.env.JWT_KEY || "secret_key_123_sadfj2321hb23r4iurhfuydsbckjsd";

module.exports = {
  PORT,
  SERVER_PATH,
  DB_PATH,
  DB_OPTIONS,
  JWT_KEY
};