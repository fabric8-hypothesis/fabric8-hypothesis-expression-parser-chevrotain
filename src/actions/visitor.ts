import * as lexer from "../lexer/lexer"
// re-using the parser implemented in step two.
import * as parser from "../parser/parser"
import { inspect } from 'util';
import { ILexingError, ILexingResult } from "chevrotain";

// A new parser instance  with CST output enabled.
const parserInstance = new parser.ExpressionParser([], { outputCst: true })
// The base visitor class can be accessed via the a parser instance.
const ExpressionVisitor = parserInstance.getBaseCstVisitorConstructor()

class SQLToAstVisitor extends ExpressionVisitor {
    constructor() {
        super()
        this.validateVisitor()
    }

    hddexpression(ctx: any) {
        if (ctx.expression) {
            return {
                predicate: ctx.expression[0].children.statement[0],
                output: ctx.expression[0].children.statement[1]
            }
        }
        return {
            statement: ctx.statement[0]
        }
    }

    expression(ctx: any) {
        return { 
            predicate : ctx.statement[0],
            output : ctx.statement[1]
        }
    }

    statement(ctx: any) {
        const comparisons = new Array
        const conjunctions = new Array
        if (ctx.comparison) {
            for (let i=0; i < ctx.comparison.length; i++) {
                comparisons.push(ctx.comparison[i])
            }
        }
    
        if (ctx.conjunction) {
            for (let i=0; i < ctx.conjunction.length; i++) {
                conjunctions.push(ctx.conjunction[i])
            }
        }

        return {
            type: "statement",
            comparisons : comparisons,
            conjunctions: conjunctions
        }
    }

    comparison(ctx: any) {
        const lhs = this.visit(ctx.lhs[0])
        const operator = this.visit(ctx.relationalOperator)
        const rhs = this.visit(ctx.rhs[0])

        return {
            type: "comparison",
            lhs: lhs,
            operator: operator,
            rhs: rhs
        }
    }

    conjunction(ctx: any) {
        if (ctx.And) {
            return ctx.And[0].image
        } else {
            return ctx.Or[0].image
        }
    }

    // these two visitor methods will return a string.
    atomicExpression(ctx: any) {
        if (ctx.Integer) {
            return ctx.Integer[0].image
        } else if (ctx.boolean) {
            return ctx.boolean[0]
        } else {
            return ctx.Identifier[0].image
        }
    }

    boolean(ctx:any) {
        if (ctx.True) {
            return ctx.True[0].image            
        } else if (ctx.False) {
            return ctx.False[0].image
        }
    }

    relationalOperator(ctx: any) {
        if (ctx.GreaterThan) {
            return ctx.GreaterThan[0].image
        } else if (ctx.LessrThan) {
            return ctx.LessThan[0].image
        } else if (ctx.GreaterThanEqualTo) {
            return ctx.GreaterThanEqualTo[0].image
        } else if (ctx.LessThanEqualTo) {
            return ctx.LessThanEqualTo[0].image
        } else {
            return ctx.EqualTo[0].image
        }
    }
}

// Our visitor has no state, so a single instance is sufficient.
const toAstVisitorInstance = new SQLToAstVisitor()

export function toAst (inputText: string) {
    const lexResult = lexer.lex(inputText)

    if ((<{name: string, body: ILexingError[]}>lexResult).name && (<{name: string, body: ILexingError[]}>lexResult).name == 'SyntaxError') {
        //return (<{name: string, body: ILexingError[]}>lexResult)
        return lexResult;
    }

    // ".input" is a setter which will reset the parser's internal's state.
    parserInstance.input = (<ILexingResult>lexResult).tokens

    // Automatic CST created when parsing
    const cst = parserInstance.hddexpression()

    if (parserInstance.errors.length > 0) {
        return {
            name: 'ParsingError',
            body: parserInstance.errors
        }
    }

    const ast = toAstVisitorInstance.visit(cst)
    return ast
}