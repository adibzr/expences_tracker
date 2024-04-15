"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const budgetSchema = new mongoose_1.default.Schema({
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
    amount: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() },
    funds: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Funds" },
    expense: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Expense" }],
});
exports.default = mongoose_1.default.model("Budget", budgetSchema);
