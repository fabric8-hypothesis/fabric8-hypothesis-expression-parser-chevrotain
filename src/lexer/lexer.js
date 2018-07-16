"use strict";
exports.__esModule = true;
var chevrotain_1 = require("chevrotain");
var Identifier = chevrotain_1.createToken({ name: "Identifier", pattern: /[a-zA-Z]\w*/ });
var Integer = chevrotain_1.createToken({ name: "Integer", pattern: /0|[1-9]\d*/ });
var GreaterThan = chevrotain_1.createToken({ name: "GreaterThan", pattern: />/ });
var LessThan = chevrotain_1.createToken({ name: "LessThan", pattern: /</ });
var GreaterThanEqualTo = chevrotain_1.createToken({ name: "GreaterThanEqualTo", pattern: />=/ });
var LessThanEqualTo = chevrotain_1.createToken({ name: "LessThanEqualTo", pattern: /<=/ });
var EqualTo = chevrotain_1.createToken({ name: "EqualTo", pattern: /==/ });
var WhiteSpace = chevrotain_1.createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: chevrotain_1.Lexer.SKIPPED,
    line_breaks: true
});
var And = chevrotain_1.createToken({ name: "And", pattern: /and/i });
var Or = chevrotain_1.createToken({ name: "Or", pattern: /or/i });
var When = chevrotain_1.createToken({ name: "When", pattern: /WHEN/ });
var Then = chevrotain_1.createToken({ name: "Then", pattern: /THEN/ });
var allTokens = [
    WhiteSpace,
    And,
    Or,
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
var tokenVocabulary = {};
exports.tokenVocabulary = tokenVocabulary;
allTokens.forEach(function (tokenType) {
    if (typeof tokenType.tokenName === 'string') {
        tokenVocabulary[tokenType.tokenName] = tokenType;
    }
});
var ExpressionLexer = new chevrotain_1.Lexer(allTokens);
function lex(inputText) {
    var lexingResult = ExpressionLexer.tokenize(inputText);
    if (lexingResult.errors.length > 0) {
        console.log(lexingResult);
        throw Error("Lexing errors occured.");
    }
    return lexingResult;
}
exports.lex = lex;
