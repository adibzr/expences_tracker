"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userCreate_1 = __importDefault(require("./user/userCreate"));
const router = (0, express_1.Router)();
router.use("/user", userCreate_1.default);
exports.default = router;
