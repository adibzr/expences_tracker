"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./configuration/db");
const serverConfig_1 = __importDefault(require("./configuration/serverConfig"));
dotenv_1.default.config();
// Connect to MongoDB
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect(db_1.config.mongo.uri, {
    retryWrites: true,
    w: "majority",
});
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});
// Start server
serverConfig_1.default.listen(db_1.config.server.port, () => {
    console.log(`Server running on port: ${db_1.config.server.port}`);
});
