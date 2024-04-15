"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../../models/user"));
// import jwt from "jsonwebtoken";
const router = (0, express_1.Router)();
router.post("/newUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, email, password, expenses, budget, funds } = req.body;
    try {
        const userFound = yield user_1.default.findOne({ email: email });
        if (userFound) {
            res.status(400).send("User already exists");
            return;
        }
        const user = new user_1.default({
            name: name,
            username: username,
            email: email,
            password: password,
            expenses: expenses,
            budget: budget,
            funds: funds,
        });
        const savedUser = yield user.save();
        // const token: string = jwt.sign({ _id: savedUser._id }, "token", {
        //   expiresIn: 60 * 60 * 24,
        // });
        // res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        return res.status(200).json({ savedUser });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}));
exports.default = router;
