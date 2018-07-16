import { createToken, TokenType, Lexer, TokenVocabulary, LexerDefinitionErrorType } from 'chevrotain';

const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]\w*/ })

const Integer = createToken({ name: "Integer", pattern: /[+-]?(0|[1-9]\d*)/ })

const GreaterThan = createToken({ name: "GreaterThan", pattern: />/ })

const LessThan = createToken({ name: "LessThan", pattern: /</ })

const GreaterThanEqualTo = createToken({ name: "GreaterThanEqualTo", pattern: />=/ })

const LessThanEqualTo = createToken({ name: "LessThanEqualTo", pattern: /<=/ })

const EqualTo = createToken({ name: "EqualTo", pattern: /==/ })

const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED,
    line_breaks: true
})

const True = createToken({ name: "True", pattern: /true/i })
const False = createToken({ name: "False", pattern: /false/i })

const And = createToken({ name: "And", pattern: /and/i })
const Or = createToken({ name: "Or", pattern: /or/i })

const When = createToken({ name:"When", pattern: /WHEN/ })
const Then = createToken({ name:"Then", pattern: /THEN/ })

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
]

const tokenVocabulary : TokenVocabulary = {}

allTokens.forEach(tokenType => {
    if (typeof tokenType.tokenName === 'string') {
        tokenVocabulary[tokenType.tokenName] = tokenType
    }
})

let ExpressionLexer = new Lexer(allTokens)

export {tokenVocabulary}

export function lex(inputText: string) {
    const lexingResult = ExpressionLexer.tokenize(inputText)

    if (lexingResult.errors.length > 0) {
        return {
            name: 'SyntaxError',
            body: lexingResult.errors
        }
    }

    return lexingResult
}