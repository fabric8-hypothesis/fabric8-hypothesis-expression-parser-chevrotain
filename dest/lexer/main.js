"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lexer = __importStar(require("./lexer"));
let inputText = "a <= 90 and 56 < 78 or r == 90 and x == 1 and x < 4";
const lexingResult = lexer.lex(inputText);
console.log(JSON.stringify(lexingResult, null, "\t"));
