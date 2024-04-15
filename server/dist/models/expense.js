"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const expenseSchema = new mongoose_1.default.Schema({
    date: { type: Date, default: Date.now() },
    amount: { type: Number, default: 0 },
    description: { type: String, default: "" },
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
    attachment: { type: String, default: "" },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
});
const Expense = mongoose_1.default.model("Expense", expenseSchema);
exports.default = Expense;
