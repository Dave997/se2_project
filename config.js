const DB_PATH = process.env.DB_PATH || "mongodb://127.0.0.1:27017";

const PORT = process.env.PORT || 3000;

const SERVER_PATH = process.env.SERVER_PATH || `http://localhost:${PORT}/`;

module.exports = {PORT, SERVER_PATH, DB_PATH};