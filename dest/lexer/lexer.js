"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chevrotain_1 = require("chevrotain");
const Identifier = chevrotain_1.createToken({ name: "Identifier", pattern: /[a-zA-Z]\w*/ });
const Integer = chevrotain_1.createToken({ name: "Integer", pattern: /[+-]?(0|[1-9]\d*)/ });
const GreaterThan = chevrotain_1.createToken({ name: "GreaterThan", pattern: />/ });
const LessThan = chevrotain_1.createToken({ name: "LessThan", pattern: /</ });
const GreaterThanEqualTo = chevrotain_1.createToken({ name: "GreaterThanEqualTo", pattern: />=/ });
const LessThanEqualTo = chevrotain_1.createToken({ name: "LessThanEqualTo", pattern: /<=/ });
const EqualTo = chevrotain_1.createToken({ name: "EqualTo", pattern: /==/ });
const WhiteSpace = chevrotain_1.createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: chevrotain_1.Lexer.SKIPPED,
    line_breaks: true
});
const True = chevrotain_1.createToken({ name: "True", pattern: /true/i });
const False = chevrotain_1.createToken({ name: "False", pattern: /false/i });
const And = chevrotain_1.createToken({ name: "And", pattern: /and/i });
const Or = chevrotain_1.createToken({ name: "Or", pattern: /or/i });
const When = chevrotain_1.createToken({ name: "When", pattern: /WHEN/ });
const Then = chevrotain_1.createToken({ name: "Then", pattern: /THEN/ });
let allTokens = [
    WhiteSpace,
    And,
    Or,
    True,
    False,
    Integer,
    When,
    Then,
    Identifier,
    GreaterThanEqualTo,
    LessThanEqualTo,
    GreaterThan,
    LessThan,
    EqualTo
];
const tokenVocabulary = {};
exports.tokenVocabulary = tokenVocabulary;
allTokens.forEach(tokenType => {
    if (typeof tokenType.tokenName === 'string') {
        tokenVocabulary[tokenType.tokenName] = tokenType;
    }
});
let ExpressionLexer = new chevrotain_1.Lexer(allTokens);
function lex(inputText) {
    const lexingResult = ExpressionLexer.tokenize(inputText);
    if (lexingResult.errors.length > 0) {
        return {
            name: 'SyntaxError',
            body: lexingResult.errors
        };
    }
    return lexingResult;
}
exports.lex = lex;
