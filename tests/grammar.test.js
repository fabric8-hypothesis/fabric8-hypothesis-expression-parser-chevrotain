const parse = require('../dest/grammar').parse;

describe('Testing syntactically correct expressions.', () => {

    test('WHEN a < 4 or xyz == 67 and true THEN x == 34 and x < 4', () => {

      let inputText = "WHEN a < 4 or xyz == 67 THEN x == 34 and x < 4"

      expect(parse(inputText)).toMatchObject({ predicate:
        { 
            name: 'statement',
            children: {
                comparison: [{
                    name: 'comparison',
                    children: {
                        lhs: [{
                            name: 'atomicExpression',
                            children: {
                                Identifier: [{
                                    image: 'a'
                                }]
                            }
                        }],
                        relationalOperator: [{
                            name: 'relationalOperator',
                            children: {
                                LessThan: [{
                                    image: '<'
                                }]
                            }
                        }],
                        rhs: [{
                            name: 'atomicExpression',
                            children: {
                                Integer: [{
                                    image: '4'
                                }]
                            }
                        }]
                    }
                },
                {
                    name: 'comparison',
                    children: {
                        lhs: [{
                            name: 'atomicExpression',
                            children: {
                                Identifier: [{
                                    image: 'xyz'
                                }]
                            }
                        }],
                        relationalOperator: [{
                            name: 'relationalOperator',
                            children: {
                                EqualTo: [{
                                    image: '=='
                                }]
                            }
                        }],
                        rhs: [{
                            name: 'atomicExpression',
                            children: {
                                Integer: [{
                                    image: '67'
                                }]
                            }
                        }]
                    }
                }],
                conjunction: [{
                    name: 'conjunction',
                    children: {
                        Or: [{
                            image: 'or'
                        }]
                    }
                }]
            }
        },
            output:
            { 
                name : 'statement',
                children: {
                    comparison: [{
                        name: 'comparison',
                        children: {
                            lhs: [{
                                name: 'atomicExpression',
                                children: {
                                    Identifier: [{
                                        image: 'x'
                                    }]
                                }
                            }],
                            relationalOperator: [{
                                name: 'relationalOperator',
                                children: {
                                    EqualTo: [{
                                        image: '=='
                                    }]
                                }
                            }],
                            rhs: [{
                                name: 'atomicExpression',
                                children: {
                                    Integer: [{
                                        image: '34'
                                    }]
                                }
                            }]
                        }
                    },
                    {
                        name: 'comparison',
                        children: {
                            lhs: [{
                                name: 'atomicExpression',
                                children: {
                                    Identifier: [{
                                        image: 'x'
                                    }]
                                }
                            }],
                            relationalOperator: [{
                                name: 'relationalOperator',
                                children: {
                                    LessThan: [{
                                        image: '<'
                                    }]
                                }
                            }],
                            rhs: [{
                                name: 'atomicExpression',
                                children: {
                                    Integer: [{
                                        image: '4'
                                    }]
                                }
                            }]
                        }
                    }]
                }
            } 
        });
    });

    test('WHEN a < 4 or xyz == 67 and abc > 7 THEN x < 4', () => {
      
      let inputText = "WHEN a < 4 or xyz == 67 and abc > 7 THEN x < 4"

      expect(parse(inputText)).toMatchObject({ predicate:
        { 
            name: 'statement',
            children: {
                comparison: [{
                    name: 'comparison',
                    children: {
                        lhs: [{
                            name: 'atomicExpression',
                            children: {
                                Identifier: [{
                                    image: 'a'
                                }]
                            }
                        }],
                        relationalOperator: [{
                            name: 'relationalOperator',
                            children: {
                                LessThan: [{
                                    image: '<'
                                }]
                            }
                        }],
                        rhs: [{
                            name: 'atomicExpression',
                            children: {
                                Integer: [{
                                    image: '4'
                                }]
                            }
                        }]
                    }
                },
                {
                    name: 'comparison',
                    children: {
                        lhs: [{
                            name: 'atomicExpression',
                            children: {
                                Identifier: [{
                                    image: 'xyz'
                                }]
                            }
                        }],
                        relationalOperator: [{
                            name: 'relationalOperator',
                            children: {
                                EqualTo: [{
                                    image: '=='
                                }]
                            }
                        }],
                        rhs: [{
                            name: 'atomicExpression',
                            children: {
                                Integer: [{
                                    image: '67'
                                }]
                            }
                        }]
                    }
                },
                {
                    name: 'comparison',
                    children: {
                        lhs: [{
                            name: 'atomicExpression',
                            children: {
                                Identifier: [{
                                    image: 'abc'
                                }]
                            }
                        }],
                        relationalOperator: [{
                            name: 'relationalOperator',
                            children: {
                                GreaterThan: [{
                                    image: '>'
                                }]
                            }
                        }],
                        rhs: [{
                            name: 'atomicExpression',
                            children: {
                                Integer: [{
                                    image: '7'
                                }]
                            }
                        }]
                    }
                }],
                conjunction: [{
                    name: 'conjunction',
                    children: {
                        Or: [{
                            image: 'or'
                        }]
                    }
                },
                {
                    name: 'conjunction',
                    children: {
                        And: [{
                            image: 'and'
                        }]
                    }
                }]
            }
        },
            output:
            { 
                name : 'statement',
                children: {
                    comparison: [{
                        name: 'comparison',
                        children: {
                            lhs: [{
                                name: 'atomicExpression',
                                children: {
                                    Identifier: [{
                                        image: 'x'
                                    }]
                                }
                            }],
                            relationalOperator: [{
                                name: 'relationalOperator',
                                children: {
                                    LessThan: [{
                                        image: '<'
                                    }]
                                }
                            }],
                            rhs: [{
                                name: 'atomicExpression',
                                children: {
                                    Integer: [{
                                        image: '4'
                                    }]
                                }
                            }]
                        }
                    }]
                }
            } 
        });
    });

    test('a <= 80', () => {
      let inputText = "a <= 80"
      expect(parse(inputText)).toMatchObject({ statement:
        {
            name: 'statement',
            children: {
                comparison: [{
                    name: 'comparison',
                    children: {
                        lhs:[{
                            name: 'atomicExpression',
                            children: {
                                Identifier: [{
                                    image: 'a'
                                }]
                            }
                        }],
                        relationalOperator: [{
                            name: 'relationalOperator',
                            children: {
                                LessThanEqualTo: [{
                                    image: '<='
                                }]
                            }
                        }],
                        rhs:[{
                            name: 'atomicExpression',
                            children: {
                                Integer: [{
                                    image: '80'
                                }]
                            }
                        }]
                    }
                }]
            }
        }
      });
    });

    test('true', () => {
      let inputText = "true"
      expect(parse(inputText)).toMatchObject({ statement:
        {
            name: 'statement',
            children:
            {
                boolean: [{
                    name: 'boolean',
                    children: {
                        True: [{
                            image: 'true',
                        }]
                    }
                }]
            }
        }
      });
    });

    test('false', () => {
      let inputText = "false";
      expect(parse(inputText)).toMatchObject({ statement:
        {
            name: 'statement',
            children:
            {
                boolean: [{
                    name: 'boolean',
                    children: {
                        False: [{
                            image: 'false',
                        }]
                    }
                }]
            }
        }
      });    });

    test('673', () => {
      let inputText = "673";
      expect(parse(inputText)).toMatchObject({ statement:
        {
            name: 'statement',
            children: {
                Integer: [{
                    image: '673'
                }]
            }
        }
      });
    });

    test('-73', () => {
      let inputText = "-73";
      expect(parse(inputText)).toMatchObject({ statement:
        {
            name: 'statement',
            children: {
                Integer: [{
                    image: '-73'
                }]
            }
        }
      });
    });
  });


describe('Testing syntactically incorrect expressions.', () => {

    test('a = 90', () => {
        let inputText = "a = 90"
        expect(parse(inputText)).toMatchObject({
            name: 'SyntaxError'
        });   
    });

    test('a', () => {
        let inputText = "a"
        expect(parse(inputText)).toMatchObject({
            name: 'ParsingError'
        });
    });
});