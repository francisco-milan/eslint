/**
 * @fileoverview Tests for max-classes-per-file rule.
 * @author James Garbutt <https://github.com/43081j>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-classes-per-file"),
	RuleTester = require("../../../lib/rule-tester/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
	languageOptions: { ecmaVersion: 6, sourceType: "script" },
});

ruleTester.run("max-classes-per-file", rule, {
	valid: [
		"class Foo {}",
		"var x = class {};",
		"var x = 5;",
		{
			code: "class Foo {}",
			options: [1],
		},
		{
			code: "class Foo {}\nclass Bar {}",
			options: [2],
		},
		{
			code: "class Foo {}",
			options: [{ max: 1 }],
		},
		{
			code: "class Foo {}\nclass Bar {}",
			options: [{ max: 2 }],
		},
		{
			code: `
                class Foo {}
                const myExpression = class {}
            `,
			options: [{ ignoreExpressions: true, max: 1 }],
		},
		{
			code: `
                class Foo {}
                class Bar {}
                const myExpression = class {}
            `,
			options: [{ ignoreExpressions: true, max: 2 }],
		},
	],

	invalid: [
		{
			code: "class Foo {}\nclass Bar {}",
			errors: [{ messageId: "maximumExceeded", type: "Program" }],
		},
		{
			code: "class Foo {}\nconst myExpression = class {}",
			errors: [{ messageId: "maximumExceeded", type: "Program" }],
		},
		{
			code: "var x = class {};\nvar y = class {};",
			errors: [{ messageId: "maximumExceeded", type: "Program" }],
		},
		{
			code: "class Foo {}\nvar x = class {};",
			errors: [{ messageId: "maximumExceeded", type: "Program" }],
		},
		{
			code: "class Foo {} class Bar {}",
			options: [1],
			errors: [{ messageId: "maximumExceeded", type: "Program" }],
		},
		{
			code: "class Foo {} class Bar {} class Baz {}",
			options: [2],
			errors: [{ messageId: "maximumExceeded", type: "Program" }],
		},
		{
			code: `
                class Foo {}
                class Bar {}
                const myExpression = class {}
            `,
			options: [{ ignoreExpressions: true, max: 1 }],
			errors: [{ messageId: "maximumExceeded", type: "Program" }],
		},
		{
			code: `
                class Foo {}
                class Bar {}
                class Baz {}
                const myExpression = class {}
            `,
			options: [{ ignoreExpressions: true, max: 2 }],
			errors: [{ messageId: "maximumExceeded", type: "Program" }],
		},
	],
});
