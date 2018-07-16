"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
const util_1 = require("util");
let inputText = "a <= 90 and 56 < 78 or r == 90 and x == 1 and x < 4";
// step into the parse function to debug the full flow
console.log(util_1.inspect(parser_1.parse(inputText), true, 10));
