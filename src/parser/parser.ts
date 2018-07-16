import * as lexer from "../lexer/lexer"
import {Parser, TokenType, IToken, } from "chevrotain"
const tokenVocabulary = lexer.tokenVocabulary

const WhiteSpace            = (<{[tokenName: string]: TokenType}>tokenVocabulary).WhiteSpace

const Identifier            = (<{[tokenName: string]: TokenType}>tokenVocabulary).Identifier

const Integer               = (<{[tokenName: string]: TokenType}>tokenVocabulary).Integer

const GreaterThanEqualTo    = (<{[tokenName: string]: TokenType}>tokenVocabulary).GreaterThanEqualTo
const LessThanEqualTo       = (<{[tokenName: string]: TokenType}>tokenVocabulary).LessThanEqualTo
const GreaterThan           = (<{[tokenName: string]: TokenType}>tokenVocabulary).GreaterThan
const LessThan              = (<{[tokenName: string]: TokenType}>tokenVocabulary).LessThan
const EqualTo               = (<{[tokenName: string]: TokenType}>tokenVocabulary).EqualTo

const And                   = (<{[tokenName: string]: TokenType}>tokenVocabulary).And
const Or                    = (<{[tokenName: string]: TokenType}>tokenVocabulary).Or

const When                  = (<{[tokenName: string]: TokenType}>tokenVocabulary).When
const Then                  = (<{[tokenName: string]: TokenType}>tokenVocabulary).Then

const False                  = (<{[tokenName: string]: TokenType}>tokenVocabulary).False
const True                  = (<{[tokenName: string]: TokenType}>tokenVocabulary).True

class ExpressionParser extends Parser {
    // A config object as a constructor argument is normally not needed.
    // Our tutorial scenario requires a dynamic configuration to support step3 without duplicating code.
    constructor(input: IToken[], config = { outputCst: true }) {
        super(input, tokenVocabulary, config)
        // very important to call this after all the rules have been defined.
        // otherwise the parser may not work correctly as it will lack information
        // derived during the self analysis phase.
        Parser.performSelfAnalysis(this)
    }

    public hddexpression = this.RULE('hddexpression', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.expression)},
            {ALT: () => this.SUBRULE(this.statement)}
        ])
    })
 
    public expression = this.RULE("expression", () => {
        this.CONSUME(When)
        this.SUBRULE(this.statement)
        this.CONSUME(Then)
        this.SUBRULE1(this.statement)
    })

    private statement = this.RULE("statement", () => {
        this.OR([
            {ALT: () => {
                        this.SUBRULE(this.comparison)
                        this.MANY(() => {
                            this.SUBRULE(this.conjunction)
                            this.SUBRULE1(this.comparison)
                        })}
            },
            { ALT: () => this.CONSUME(Integer)},
            { ALT: () => this.SUBRULE(this.boolean)}
        ])

    })

    private conjunction = this.RULE("conjunction", () => {
        this.OR([
            { ALT: () => this.CONSUME(And)},
            { ALT: () => this.CONSUME(Or)}
        ])
    })

    // The "rhs" and "lhs" (Right/Left Hand Side) labels will provide easy
    // to use names during CST Visitor (step 3a).
    private comparison = this.RULE("comparison", () => {
        this.SUBRULE(this.atomicExpression, { LABEL: "lhs" })
        this.SUBRULE(this.relationalOperator)
        this.SUBRULE1(this.atomicExpression, { LABEL: "rhs" })
    })

    private atomicExpression = this.RULE("atomicExpression", () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.boolean) },
            { ALT: () => this.CONSUME(Integer) },
            { ALT: () => this.CONSUME(Identifier) }
        ])
    })

    private boolean = this.RULE("boolean", () => {
        this.OR([
            { ALT: () => this.CONSUME(True) },
            { ALT: () => this.CONSUME(False) }
        ])
    })

    private relationalOperator = this.RULE("relationalOperator", () => {
        this.OR([
            { ALT: () => this.CONSUME(GreaterThan) },
            { ALT: () => this.CONSUME(LessThan) },
            { ALT: () => this.CONSUME(GreaterThanEqualTo) },
            { ALT: () => this.CONSUME(LessThanEqualTo) },
            { ALT: () => this.CONSUME(EqualTo) }
        ])
    })
}

// We only ever need one as the parser internal state is reset for each new input.
const parserInstance = new ExpressionParser([])

export {ExpressionParser, parserInstance}
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