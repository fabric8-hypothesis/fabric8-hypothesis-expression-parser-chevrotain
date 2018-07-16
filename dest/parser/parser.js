"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lexer = __importStar(require("../lexer/lexer"));
const chevrotain_1 = require("chevrotain");
const tokenVocabulary = lexer.tokenVocabulary;
const WhiteSpace = tokenVocabulary.WhiteSpace;
const Identifier = tokenVocabulary.Identifier;
const Integer = tokenVocabulary.Integer;
const GreaterThanEqualTo = tokenVocabulary.GreaterThanEqualTo;
const LessThanEqualTo = tokenVocabulary.LessThanEqualTo;
const GreaterThan = tokenVocabulary.GreaterThan;
const LessThan = tokenVocabulary.LessThan;
const EqualTo = tokenVocabulary.EqualTo;
const And = tokenVocabulary.And;
const Or = tokenVocabulary.Or;
const When = tokenVocabulary.When;
const Then = tokenVocabulary.Then;
const False = tokenVocabulary.False;
const True = tokenVocabulary.True;
class ExpressionParser extends chevrotain_1.Parser {
    // A config object as a constructor argument is normally not needed.
    // Our tutorial scenario requires a dynamic configuration to support step3 without duplicating code.
    constructor(input, config = { outputCst: true }) {
        super(input, tokenVocabulary, config);
        this.hddexpression = this.RULE('hddexpression', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.expression) },
                { ALT: () => this.SUBRULE(this.statement) }
            ]);
        });
        this.expression = this.RULE("expression", () => {
            this.CONSUME(When);
            this.SUBRULE(this.statement);
            this.CONSUME(Then);
            this.SUBRULE1(this.statement);
        });
        this.statement = this.RULE("statement", () => {
            this.OR([
                { ALT: () => {
                        this.SUBRULE(this.comparison);
                        this.MANY(() => {
                            this.SUBRULE(this.conjunction);
                            this.SUBRULE1(this.comparison);
                        });
                    }
                },
                { ALT: () => this.CONSUME(Integer) },
                { ALT: () => this.SUBRULE(this.boolean) }
            ]);
        });
        this.conjunction = this.RULE("conjunction", () => {
            this.OR([
                { ALT: () => this.CONSUME(And) },
                { ALT: () => this.CONSUME(Or) }
            ]);
        });
        // The "rhs" and "lhs" (Right/Left Hand Side) labels will provide easy
        // to use names during CST Visitor (step 3a).
        this.comparison = this.RULE("comparison", () => {
            this.SUBRULE(this.atomicExpression, { LABEL: "lhs" });
            this.SUBRULE(this.relationalOperator);
            this.SUBRULE1(this.atomicExpression, { LABEL: "rhs" });
        });
        this.atomicExpression = this.RULE("atomicExpression", () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.boolean) },
                { ALT: () => this.CONSUME(Integer) },
                { ALT: () => this.CONSUME(Identifier) }
            ]);
        });
        this.boolean = this.RULE("boolean", () => {
            this.OR([
                { ALT: () => this.CONSUME(True) },
                { ALT: () => this.CONSUME(False) }
            ]);
        });
        this.relationalOperator = this.RULE("relationalOperator", () => {
            this.OR([
                { ALT: () => this.CONSUME(GreaterThan) },
                { ALT: () => this.CONSUME(LessThan) },
                { ALT: () => this.CONSUME(GreaterThanEqualTo) },
                { ALT: () => this.CONSUME(LessThanEqualTo) },
                { ALT: () => this.CONSUME(EqualTo) }
            ]);
        });
        // very important to call this after all the rules have been defined.
        // otherwise the parser may not work correctly as it will lack information
        // derived during the self analysis phase.
        chevrotain_1.Parser.performSelfAnalysis(this);
    }
}
exports.ExpressionParser = ExpressionParser;
// We only ever need one as the parser internal state is reset for each new input.
const parserInstance = new ExpressionParser([]);
exports.parserInstance = parserInstance;
/*
export function parse(inputText : string) {
    const lexResult = lexer.lex(inputText)

    if (lexResult.errors.length > 0) {
        return lexResult.errors;
    }

    // ".input" is a setter which will reset the parser's internal's state.
    parserInstance.input = lexResult.tokens

    // No semantic actions so this won't return anything yet.
    const cstOutput = parserInstance.hddexpression()

    if (parserInstance.errors.length > 0) {
        throw Error(
            "Parsing errors detected!\n" +
                parserInstance.errors[0].message
        )
    }

    return cstOutput
}*/ 
