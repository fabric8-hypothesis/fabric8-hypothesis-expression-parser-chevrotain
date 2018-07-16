"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var lexer = require("../lexer/lexer");
var chevrotain_1 = require("chevrotain");
var tokenVocabulary = lexer.tokenVocabulary;
var WhiteSpace = tokenVocabulary.WhiteSpace;
var Identifier = tokenVocabulary.Identifier;
var Integer = tokenVocabulary.Integer;
var GreaterThanEqualTo = tokenVocabulary.GreaterThanEqualTo;
var LessThanEqualTo = tokenVocabulary.LessThanEqualTo;
var GreaterThan = tokenVocabulary.GreaterThan;
var LessThan = tokenVocabulary.LessThan;
var EqualTo = tokenVocabulary.EqualTo;
var And = tokenVocabulary.And;
var Or = tokenVocabulary.Or;
var When = tokenVocabulary.When;
var Then = tokenVocabulary.Then;
// ----------------- parser -----------------
//        constructor(input: IToken[], tokenVocabulary: TokenVocabulary, config?: IParserConfig);
var ExpressionParser = /** @class */ (function (_super) {
    __extends(ExpressionParser, _super);
    // A config object as a constructor argument is normally not needed.
    // Our tutorial scenario requires a dynamic configuration to support step3 without duplicating code.
    function ExpressionParser(input, config) {
        if (config === void 0) { config = { outputCst: true }; }
        var _this = _super.call(this, input, tokenVocabulary, config) || this;
        _this.hddexpression = _this.RULE('hddexpression', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.expression); } },
                { ALT: function () { return _this.SUBRULE(_this.statement); } }
            ]);
        });
        _this.expression = _this.RULE("expression", function () {
            _this.CONSUME(When);
            _this.SUBRULE(_this.statement);
            _this.CONSUME(Then);
            _this.SUBRULE1(_this.statement);
        });
        _this.statement = _this.RULE("statement", function () {
            _this.SUBRULE(_this.comparison);
            _this.MANY(function () {
                _this.SUBRULE(_this.conjunction);
                _this.SUBRULE1(_this.comparison);
            });
        });
        _this.conjunction = _this.RULE("conjunction", function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(And); } },
                { ALT: function () { return _this.CONSUME(Or); } }
            ]);
        });
        // The "rhs" and "lhs" (Right/Left Hand Side) labels will provide easy
        // to use names during CST Visitor (step 3a).
        _this.comparison = _this.RULE("comparison", function () {
            _this.SUBRULE(_this.atomicExpression, { LABEL: "lhs" });
            _this.SUBRULE(_this.relationalOperator);
            _this.SUBRULE1(_this.atomicExpression, { LABEL: "rhs" }); // note the '2' suffix to distinguish
            // from the 'SUBRULE(atomicExpression)'
            // 2 lines above.
        });
        _this.atomicExpression = _this.RULE("atomicExpression", function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(Integer); } },
                { ALT: function () { return _this.CONSUME(Identifier); } }
            ]);
        });
        _this.relationalOperator = _this.RULE("relationalOperator", function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(GreaterThan); } },
                { ALT: function () { return _this.CONSUME(LessThan); } },
                { ALT: function () { return _this.CONSUME(GreaterThanEqualTo); } },
                { ALT: function () { return _this.CONSUME(LessThanEqualTo); } },
                { ALT: function () { return _this.CONSUME(EqualTo); } }
            ]);
        });
        // very important to call this after all the rules have been defined.
        // otherwise the parser may not work correctly as it will lack information
        // derived during the self analysis phase.
        chevrotain_1.Parser.performSelfAnalysis(_this);
        return _this;
    }
    return ExpressionParser;
}(chevrotain_1.Parser));
exports.ExpressionParser = ExpressionParser;
// We only ever need one as the parser internal state is reset for each new input.
var parserInstance = new ExpressionParser([]);
exports.parserInstance = parserInstance;
function parse(inputText) {
    var lexResult = lexer.lex(inputText);
    //    console.log("inside 1", lexResult)
    // ".input" is a setter which will reset the parser's internal's state.
    parserInstance.input = lexResult.tokens;
    console.log("Lexing Errors:", lexResult.errors);
    console.log("Parsing Errors:", parserInstance.errors);
    // No semantic actions so this won't return anything yet.
    var cstOutput = parserInstance.expression();
    //console.log(cstOutput)
    for (var i = 0; i < cstOutput.children.expression.length; i++) {
        //console.log(cstOutput.children.expression[i])
    }
    if (parserInstance.errors.length > 0) {
        throw Error("Parsing errors detected!\n" +
            parserInstance.errors[0].message);
    }
}
exports.parse = parse;
