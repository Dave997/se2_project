const DB_PATH = process.env.DB_PATH || "mongodb://127.0.0.1:27017";
exports.DB_PATH = DB_PATH;

const server_path = process.env.SERVER_PATH || "http://localhost:3000/";
exports.server_path = server_path;

const port = process.env.PORT || 3000;
exports.port = port;