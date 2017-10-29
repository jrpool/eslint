/**
 * @fileoverview Rule to enforce placing object properties on separate lines.
 * @author Vitor Balocco
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/object-property-newline"),
    RuleTester = require("../../../lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("object-property-newline", rule, {

    valid: [

        // default ("always")
        "var obj = {\nk1: 'val1',\nk2: 'val2',\nk3: 'val3',\nk4: 'val4'\n};",

        // "always"
        { code: "var obj = {\nk1: 'val1',\nk2: 'val2',\nk3: 'val3',\nk4: 'val4'\n};", options: ["always"] },
        { code: "var obj = {\nk1: 'val1'\n, k2: 'val2'\n, k3: 'val3'\n, k4: 'val4'\n};", options: ["always"] },
        { code: "var obj = {k1: 'val1',\nk2: 'val2',\nk3: 'val3',\nk4: 'val4'};", options: ["always"] },
        { code: "var obj = {k1: 'val1'\n, k2: 'val2'\n, k3: 'val3'\n, k4: 'val4'};", options: ["always"] },
        { code: "var obj = {k1: 'val1'};", options: ["always"] },
        { code: "var obj = {\nk1: 'val1'\n};", options: ["always"] },
        { code: "var obj = {};", options: ["always"] },
        { code: "var obj = {\n[bar]: 'baz',\nbaz\n};", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "var obj = {\nk1: 'val1',\nk2: 'val2',\n...{}\n};", options: ["always"], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "var obj = {k1: 'val1',\nk2: 'val2',\n...{}};", options: ["always"], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "var obj = {...{}};", options: ["always"], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "foo({k1: 'val1',\nk2: 'val2'});", options: ["always"] },
        { code: "foo({\nk1: 'val1',\nk2: 'val2'\n});", options: ["always"] },
        { code: "foo({\na,\nb\n});", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({\na,\nb,\n});", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({\nbar() {},\nbaz\n});", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({\n[bar]: 'baz',\nbaz \n})", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({\nk1: 'val1',\nk2: 'val2',\n...{}\n});", options: ["always"], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "foo({k1: 'val1',\nk2: 'val2',\n...{}});", options: ["always"], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "foo({...{}});", options: ["always"], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },

        // default ("always"), { allowAllPropertiesOnSameLine: true }
        { code: "var obj = {k1: 'val1', k2: 'val2', k3: 'val3'};", options: [{ allowAllPropertiesOnSameLine: true }] },

        // "always", { allowAllPropertiesOnSameLine: true }
        { code: "var obj = {k1: 'val1', k2: 'val2', k3: 'val3'};", options: ["always", { allowAllPropertiesOnSameLine: true }] },
        { code: "var obj = {\nk1: 'val1', k2: 'val2', k3: 'val3'\n};", options: ["always", { allowAllPropertiesOnSameLine: true }] },
        { code: "var obj = {k1: 'val1'};", options: ["always", { allowAllPropertiesOnSameLine: true }] },
        { code: "var obj = {\nk1: 'val1'\n};", options: ["always", { allowAllPropertiesOnSameLine: true }] },
        { code: "var obj = {};", options: ["always", { allowAllPropertiesOnSameLine: true }] },
        { code: "var obj = {'k1': 'val1', k2: 'val2', ...{}};", options: ["always", { allowAllPropertiesOnSameLine: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "var obj = {\n'k1': 'val1', k2: 'val2', ...{}\n};", options: ["always", { allowAllPropertiesOnSameLine: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "foo({k1: 'val1', k2: 'val2'});", options: ["always", { allowAllPropertiesOnSameLine: true }] },
        { code: "foo({\nk1: 'val1', k2: 'val2'\n});", options: ["always", { allowAllPropertiesOnSameLine: true }] },
        { code: "foo({a, b});", options: ["always", { allowAllPropertiesOnSameLine: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({bar() {}, baz});", options: ["always", { allowAllPropertiesOnSameLine: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({[bar]: 'baz', baz})", options: ["always", { allowAllPropertiesOnSameLine: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({'k1': 'val1', k2: 'val2', ...{}});", options: ["always", { allowAllPropertiesOnSameLine: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "foo({\n'k1': 'val1', k2: 'val2', ...{}\n});", options: ["always", { allowAllPropertiesOnSameLine: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "var obj = {k1: ['foo', 'bar'], k2: 'val1', k3: 'val2'};", options: ["always", { allowAllPropertiesOnSameLine: true }] },
        { code: "var obj = {\nk1: ['foo', 'bar'], k2: 'val1', k3: 'val2'\n};", options: ["always", { allowAllPropertiesOnSameLine: true }] },
        { code: "var obj = {\nk1: 'val1', k2: {e1: 'foo', e2: 'bar'}, k3: 'val2'\n};", options: ["always", { allowAllPropertiesOnSameLine: true }] },

        // default ("always"), { allowMultiplePropertiesPerLine: true } (deprecated)
        { code: "var obj = {k1: 'val1', k2: 'val2', k3: 'val3'};", options: [{ allowMultiplePropertiesPerLine: true }] },

        // "always", { allowMultiplePropertiesPerLine: true } (deprecated)
        { code: "var obj = {k1: 'val1', k2: 'val2', k3: 'val3'};", options: ["always", { allowMultiplePropertiesPerLine: true }] },

        // default ("always"), { treatComputedPropertiesLikeJSCS: true }
        { code: "var obj = {k1: 'val1',\nk2: 'val2',\nk3: 'val3',\nk4: 'val4'};", options: [{ treatComputedPropertiesLikeJSCS: true }] },

        // "always", { treatComputedPropertiesLikeJSCS: true }
        { code: "var obj = {k1: 'val1',\nk2: 'val2',\nk3: 'val3',\nk4: 'val4'};", options: ["always", { treatComputedPropertiesLikeJSCS: true }] },
        { code: "var obj = {k1: 'val1'\n, k2: 'val2'\n, k3: 'val3'\n, k4: 'val4'};", options: ["always", { treatComputedPropertiesLikeJSCS: true }] },
        { code: "foo({\nk1: 'val1',\n[bar]: 'baz',\nbaz\n})", options: ["always", { treatComputedPropertiesLikeJSCS: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({\nk1: 'val1', [\nbar\n]: 'baz',\nbaz\n})", options: ["always", { treatComputedPropertiesLikeJSCS: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({\nk1: 'val1', [\nbar\n]: 'baz'\n,baz\n})", options: ["always", { treatComputedPropertiesLikeJSCS: true }], parserOptions: { ecmaVersion: 6 } },

        // default ("always"), { noCommaFirst: true }
        { code: "var obj = {k1: 'val1',\nk2: 'val2',\nk3: 'val3',\nk4: 'val4'};", options: [{ noCommaFirst: true }] },

        // "always", { noCommaFirst: true }
        { code: "var obj = {k1: 'val1',\nk2: 'val2',\nk3: 'val3',\nk4: 'val4'};", options: ["always", { noCommaFirst: true }] },
        { code: "foo({\nk1: 'val1',\nk2: 'val2',\n...{}\n});", options: ["always", { noCommaFirst: true }], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },

        // default ("always"), { treatComputedPropertiesLikeJSCS: true, noCommaFirst: true }
        { code: "foo({\nk1: 'val1', [\nbar\n]: 'baz',\nbaz\n})", options: [{ treatComputedPropertiesLikeJSCS: true, noCommaFirst: true }], parserOptions: { ecmaVersion: 6 } },

        // "always", { treatComputedPropertiesLikeJSCS: true, noCommaFirst: true }
        { code: "foo({\nk1: 'val1', [\nbar\n]: 'baz',\nbaz\n})", options: ["always", { treatComputedPropertiesLikeJSCS: true, noCommaFirst: true }], parserOptions: { ecmaVersion: 6 } },

        // "never"
        { code: "var obj = {k1: 'val1', k2: 'val2', k3: 'val3'};", options: ["never"] },
        { code: "var obj = {\nk1: 'val1', k2: 'val2'\n};", options: ["never"] },
        { code: "var obj = {k1: ['foo', 'bar'], k2: 'val2'};", options: ["never"] },
        { code: "var obj = {\nk1: 'val1', k2: {e1: 'foo', e2: 'bar'}, k3: 'val3'\n};", options: ["never"] },
        { code: "var obj = {k1: 'val1', ...{}};", options: ["never"], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "var obj = {\nk1: 'val1', ...{}\n};", options: ["never"], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "var obj = {\n[foo]: 'bar', baz\n};", options: ["never", { unlessCommaBefore: true }, parserOptions: { ecmaVersion: 6 } },
        { code: "foo({k1: 'val1', k2: 'val2'});", options: ["never"] },
        { code: "foo({\nk1: 'val1', k2: 'val2'\n});", options: ["never"] },
        { code: "foo({a, b});", options: ["never"], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({\na, b\n});", options: ["never"], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({\nbar() {}, baz\n});", options: ["never"], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({\n[bar]: 'baz', baz\n})", options: ["never"], parserOptions: { ecmaVersion: 6 } },
        { code: "foo({k1: 'val1', ...{}})", options: ["never"], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "foo({\nk1: 'val1', ...{}\n})", options: ["never"], parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } } },
        { code: "({foo: 1 /* comment */, bar: 2})", options: ["never"] },
        { code: "({foo: 1, /* comment */ bar: 2})", options: ["never"] },
        { code: "var obj = {k1: [\n'val1',\n'val2',\n'val3'\n]};", options: ["never"] },
        { code: "var obj = {};", options: ["never"] },

        // "never", { unlessCommaBefore: true }
        { code: "var obj = {k1: 'val1', k2: 'val2', k3: 'val3'};", options: ["never", { unlessCommaBefore: true }] },
        { code: "var obj = {k1: 'val1'\n, k2: 'val2'\n, k3: 'val3'};", options: ["never", { unlessCommaBefore: true }] },
        { code: "var obj = {k1: ['foo', 'bar'], k2: 'val1'};", options: ["never", { unlessCommaBefore: true }] },
        { code: "var obj = {k1: [\n'foo', 'bar', 'baz'\n], k2: 'val2'};", options: ["never", { unlessCommaBefore: true }] },
        { code: "var obj = {k1: [\n'foo',\n'bar',\n'baz'\n], k2: 'val2'};", options: ["never", { unlessCommaBefore: true }] },
        { code: "var obj = {k1: 'val1', k2: {\nka: 'foo', kb: 'bar', kc: 'baz'\n}, k3: 'val3'};", options: ["never", { unlessCommaBefore: true }] },
        { code: "var obj = {k1: 'val1', k2: {\nka: 'foo'\n, kb: 'bar'\n, kc: 'baz'\n}, k3: 'val3'};", options: ["never", { unlessCommaBefore: true }] },
        { code: "var obj = {k1: 'val1'\n, k2: {\nka: 'foo'\n, kb: 'bar'\n, kc: 'baz'\n}\n, k3: 'val3'};", options: ["never", { unlessCommaBefore: true }] },
        { code: "var obj = {k1: 'val1'\n, k2: {ka: 'foo', kb: 'bar', kc: 'baz'}\n, k3: 'val3'};", options: ["never", { unlessCommaBefore: true }] },
        { code: "var obj = {\n[foo]: 'bar'\n, baz\n};", options: ["never", { unlessCommaBefore: true }, parserOptions: { ecmaVersion: 6 } },
        { code: "foo({k1: 'val1', k2: 'val2'});", options: ["never", { unlessCommaBefore: true }] },
        { code: "foo({k1: 'val1'\n, k2: 'val2'});", options: ["never", { unlessCommaBefore: true }] },
        { code: "foo({\nk1: 'val1'\n, k2: 'val2'\n});", options: ["never", { unlessCommaBefore: true }] },
        { code: "({foo: 1 /* comment */, bar: 2})", options: ["never", { unlessCommaBefore: true }] },
        { code: "({foo: 1 /* comment */\n, bar: 2})", options: ["never", { unlessCommaBefore: true }] },
        { code: "({foo: 1, /* comment */ bar: 2})", options: ["never", { unlessCommaBefore: true }] },
        { code: "({foo: 1\n, /* comment */ bar: 2})", options: ["never", { unlessCommaBefore: true }] }

    ],

    invalid: [

        // default ("always")
        {
            code: "var obj = {k1: 'val1', k2: 'val2', k3: 'val3'};",
            output: "var obj = {k1: 'val1',\nk2: 'val2',\nk3: 'val3'};",
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 25
                },
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 37
                }
            ]
        },

        // "always"
        {
            code: "var obj = {k1: 'val1', k2: 'val2', k3: 'val3'};",
            output: "var obj = {k1: 'val1',\nk2: 'val2',\nk3: 'val3'};",
            options: ["always"],
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 25
                },
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 37
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1', k2: 'val2'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: 'val2'\n};",
            options: ["always"],
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1', k2: 'val2',\nk3: 'val3', k4: 'val4'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: 'val2',\nk3: 'val3',\nk4: 'val4'\n};",
            options: ["always"],
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                },
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },
        {
            code: "var obj = {k1: ['foo', 'bar'], k2: 'val1'};",
            output: "var obj = {k1: ['foo', 'bar'],\nk2: 'val1'};",
            options: ["always"],
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 32
                }
            ]
        },
        {
            code: "var obj = {k1: [\n'foo', 'bar'\n], k2: 'val1'};",
            output: "var obj = {k1: [\n'foo', 'bar'\n],\nk2: 'val1'};",
            options: ["always"],
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 4
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1', k2: {e1: 'foo', e2: 'bar'}, k3: 'val2'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: {e1: 'foo',\ne2: 'bar'},\nk3: 'val2'\n};",
            options: ["always"],
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                },
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 29
                },
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 41
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1',\nk2: {e1: 'foo', e2: 'bar'},\nk3: 'val2'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: {e1: 'foo',\ne2: 'bar'},\nk3: 'val2'\n};",
            options: ["always"],
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 17
                }
            ]
        },
        {
            code: "var obj = {k1: 'val1',\nk2: [\n'val2a', 'val2b', 'val2c'\n], k3: 'val3'};",
            output: "var obj = {k1: 'val1',\nk2: [\n'val2a', 'val2b', 'val2c'\n],\nk3: 'val3'};",
            options: ["always"],
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 4
                }
            ]
        },
        {
            code: "var obj = {k1: 'val1', [\nk2]: 'val2'};",
            output: "var obj = {k1: 'val1',\n[\nk2]: 'val2'};",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 25
                }
            ]
        },
        {
            code: "var obj = {k1: 'val1', ...{}};",
            output: "var obj = {k1: 'val1',\n...{}};",
            options: ["always"],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 25
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1', ...{}\n};",
            output: "var obj = {\nk1: 'val1',\n...{}\n};",
            options: ["always"],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                }
            ]
        },
        {
            code: "foo({k1: 'val1', k2: 'val2'});",
            output: "foo({k1: 'val1',\nk2: 'val2'});",
            options: ["always"],
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 19
                }
            ]
        },
        {
            code: "foo({\nk1: 'val1', k2: 'val2'\n});",
            output: "foo({\nk1: 'val1',\nk2: 'val2'\n});",
            options: ["always"],
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                }
            ]
        },
        {
            code: "foo({a, b});",
            output: "foo({a,\nb});",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            code: "foo({\na, b\n});",
            output: "foo({\na,\nb\n});",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 4
                }
            ]
        },
        {
            code: "foo({\nbar() {}, baz\n});",
            output: "foo({\nbar() {},\nbaz\n});",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 11
                }
            ]
        },
        {
            code: "foo({\n[bar]: 'baz', baz\n})",
            output: "foo({\n[bar]: 'baz',\nbaz\n})",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 15
                }
            ]
        },
        {
            code: "foo({k1: 'val1', [\nk2]: 'val2'})",
            output: "foo({k1: 'val1',\n[\nk2]: 'val2'})",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 19
                }
            ]
        },
        {
            code: "foo({k1: 'val1', ...{}})",
            output: "foo({k1: 'val1',\n...{}})",
            options: ["always"],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 19
                }
            ]
        },
        {
            code: "foo({\nk1: 'val1', ...{}\n})",
            output: "foo({\nk1: 'val1',\n...{}\n})",
            options: ["always"],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                }
            ]
        },
        {
            code: "var obj = {\na: {\nb: 1,\nc: 2\n}, d: 2\n};",
            output: "var obj = {\na: {\nb: 1,\nc: 2\n},\nd: 2\n};",
            options: ["always"],
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 5,
                    column: 4
                }
            ]
        },
        {
            code: "({foo: 1 /* comment */, bar: 2})",
            output: "({foo: 1 /* comment */,\nbar: 2})",
            options: ["always"],
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 26
                }
            ]
        },
        {
            code: "({foo: 1, /* comment */ bar: 2})",
            output: null, // not fixed because of comment
            options: ["always"],
            errors: [
                {
                    message: "No two object properties may be on the same line.",
                    type: "ObjectExpression",
                    line: 1,
                    column: 26
                }
            ]
        },

        // default ("always"), { allowAllPropertiesOnSameLine: true }
        {
            code: "var obj = {\nk1: 'val1',\nk2: 'val2', k3: 'val3'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: 'val2',\nk3: 'val3'\n};",
            options: [{ allowAllPropertiesOnSameLine: true }],
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },

        // "always", { allowAllPropertiesOnSameLine: true }
        {
            code: "var obj = {\nk1: 'val1',\nk2: 'val2', k3: 'val3'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: 'val2',\nk3: 'val3'\n};",
            options: ["always", { allowAllPropertiesOnSameLine: true }],
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },
        {
            code: "var obj = {\nk1:\n'val1', k2: 'val2', k3:\n'val3'\n};",
            output: "var obj = {\nk1:\n'val1',\nk2: 'val2',\nk3:\n'val3'\n};",
            options: ["always", { allowAllPropertiesOnSameLine: true }],
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 9
                },
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 21
                }
            ]
        },
        {
            code: "var obj = {k1: [\n'foo',\n'bar'\n], k2: 'val1'};",
            output: "var obj = {k1: [\n'foo',\n'bar'\n],\nk2: 'val1'};",
            options: ["always", { allowAllPropertiesOnSameLine: true }],
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 4
                }
            ]
        },
        {
            code: "var obj = {k1: [\n'foo', 'bar'\n], k2: 'val1'};",
            output: "var obj = {k1: [\n'foo', 'bar'\n],\nk2: 'val1'};",
            options: ["always", { allowAllPropertiesOnSameLine: true }],
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 4
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1', k2: {\ne1: 'foo', e2: 'bar'\n}, k3: 'val2'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: {\ne1: 'foo', e2: 'bar'\n},\nk3: 'val2'\n};",
            options: ["always", { allowAllPropertiesOnSameLine: true }],
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 13
                },
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 4
                }
            ]
        },
        {
            code: "var obj = {k1: 'val1',\nk2: [\n'val2a', 'val2b', 'val2c'\n], k3: 'val3'};",
            output: "var obj = {k1: 'val1',\nk2: [\n'val2a', 'val2b', 'val2c'\n],\nk3: 'val3'};",
            options: ["always", { allowAllPropertiesOnSameLine: true }],
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 4
                }
            ]
        },
        {
            code: "var obj = {[\nk1]: 'val1', k2: 'val2'};",
            output: "var obj = {[\nk1]: 'val1',\nk2: 'val2'};",
            options: ["always", {allowAllPropertiesOnSameLine: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 14
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1',\nk2: 'val2', ...{}\n};",
            output: "var obj = {\nk1: 'val1',\nk2: 'val2',\n...{}\n};",
            options: ["always", { allowAllPropertiesOnSameLine: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },
        {
            code: "var obj = {\n...{},\nk1: 'val1', k2: 'val2'\n};",
            output: "var obj = {\n...{},\nk1: 'val1',\nk2: 'val2'\n};",
            options: ["always", { allowAllPropertiesOnSameLine: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },
        {
            code: "foo({[\nk1]: 'val1', k2: 'val2'})",
            output: "foo({[\nk1]: 'val1',\nk2: 'val2'})",
            options: ["always", { allowAllPropertiesOnSameLine: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 14
                }
            ]
        },
        {
            code: "foo({\nk1: 'val1',\nk2: 'val2', ...{}\n})",
            output: "foo({\nk1: 'val1',\nk2: 'val2',\n...{}\n})",
            options: ["always", { allowAllPropertiesOnSameLine: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },
        {
            code: "foo({\n...{},\nk1: 'val1', k2: 'val2'\n})",
            output: "foo({\n...{},\nk1: 'val1',\nk2: 'val2'\n})",
            options: ["always", { allowAllPropertiesOnSameLine: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },

        // default ("always"), { allowMultiplePropertiesPerLine: true } (deprecated)
        {
            code: "var obj = {\nk1: 'val1',\nk2: 'val2', k3: 'val3'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: 'val2',\nk3: 'val3'\n};",
            options: [{ allowMultiplePropertiesPerLine: true }],
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },

        // "always", { allowMultiplePropertiesPerLine: true } (deprecated)
        {
            code: "var obj = {\nk1: 'val1',\nk2: 'val2', k3: 'val3'\n};",
            output: "var obj = {\nk1: 'val1',\nk2: 'val2',\nk3: 'val3'\n};",
            options: ["always", { allowMultiplePropertiesPerLine: true }],
            errors: [
                {
                    message: "No two object properties may be on the same line if they aren't all on the same line.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 13
                }
            ]
        },

        // default ("always"), { treatComputedPropertiesLikeJSCS: true }
        {
            code: "foo({\nk1: 'val1', [\nisFoo ? 'foo' : 'noo'\n]: 'val2', baz})",
            output: "foo({\nk1: 'val1', [\nisFoo ? 'foo' : 'noo'\n]: 'val2',\nbaz})",
            options: [{ treatComputedPropertiesLikeJSCS: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two object properties may be on the same line. The opening bracket of a computed property name may end a line on which another property appears.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 12
                }
            ]
        },

        // "always", { treatComputedPropertiesLikeJSCS: true }
        {
            code: "foo({\nk1: 'val1', [\nisFoo ? 'foo' : 'noo'\n]: 'val2', baz})",
            output: "foo({\nk1: 'val1', [\nisFoo ? 'foo' : 'noo'\n]: 'val2',\nbaz})",
            options: ["always", { treatComputedPropertiesLikeJSCS: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two object properties may be on the same line. The opening bracket of a computed property name may end a line on which another property appears.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 12
                }
            ]
        },
        {
            code: "var obj = {k1: 'val1',\nk2: [\n'val2a', 'val2b', 'val2c'\n], k3: 'val3'};",
            output: "var obj = {k1: 'val1',\nk2: [\n'val2a', 'val2b', 'val2c'\n],\nk3: 'val3'};",
            options: ["always", { treatComputedPropertiesLikeJSCS: true }],
            errors: [
                {
                    message: "No two object properties may be on the same line. The opening bracket of a computed property name may end a line on which another property appears.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 4
                }
            ]
        },

        // default ("always"), { noCommaFirst: true }
        {
            code: "var obj = {\nk1: 'val1'\n, k2: 'val2'\n, k3: 'val3'\n};",
            output: "var obj = {\nk1: 'val1'\n,\nk2: 'val2'\n,\nk3: 'val3'\n};",
            options: [{ noCommaFirst: true }],
            errors: [
                {
                    message: "No two object properties may be on the same line. The comma delimiting two properties may not share a line with any of the second property.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 3
                },
                {
                    message: "No two object properties may be on the same line. The comma delimiting two properties may not share a line with any of the second property.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 3
                }
            ]
        },

        // "always", { noCommaFirst: true }
        {
            code: "var obj = {\nk1: 'val1'\n, k2: 'val2'\n, k3: 'val3'\n};",
            output: "var obj = {\nk1: 'val1'\n,\nk2: 'val2'\n,\nk3: 'val3'\n};",
            // "always", { noCommaFirst: true }
            errors: [
                {
                    message: "No two object properties may be on the same line. The comma delimiting two properties may not share a line with any of the second property.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 3
                },
                {
                    message: "No two object properties may be on the same line. The comma delimiting two properties may not share a line with any of the second property.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 3
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1'\n, k2: 'val2'\n, [\nbaz1\n]: 'val3'\n};",
            output: "var obj = {\nk1: 'val1'\n,\nk2: 'val2'\n,\n[\nbaz1\n]: 'val3'\n};",
            options: ["always", { noCommaFirst: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two object properties may be on the same line. The comma delimiting two properties may not share a line with any of the second property.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 3
                },
                {
                    message: "No two object properties may be on the same line. The comma delimiting two properties may not share a line with any of the second property.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 3
                }
            ]
        },

        // default ("always"), { treatComputedPropertiesLikeJSCS: true, noCommaFirst: true }
        {
            code: "var obj = {\nk1: 'val1'\n, k2: 'val2'\n, [\nbaz2\n]: 'val3'\n};",
            output: "var obj = {\nk1: 'val1'\n,\nk2: 'val2'\n, [\nbaz2\n]: 'val3'\n};",
            options: [{
                treatComputedPropertiesLikeJSCS: true, noCommaFirst: true
            }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two object properties may be on the same line. The opening bracket of a computed property name may end a line on which another property appears. The comma delimiting two properties may not share a line with any of the second property.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 3
                }
            ]
        },

        // "always", { treatComputedPropertiesLikeJSCS: true, noCommaFirst: true }
        {
            code: "var obj = {\nk1: 'val1'\n, k2: 'val2'\n, [\nbaz2\n]: 'val3'\n};",
            output: "var obj = {\nk1: 'val1'\n,\nk2: 'val2'\n, [\nbaz2\n]: 'val3'\n};",
            options: ["always", {
                treatComputedPropertiesLikeJSCS: true, noCommaFirst: true
            }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two object properties may be on the same line. The opening bracket of a computed property name may end a line on which another property appears. The comma delimiting two properties may not share a line with any of the second property.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 3
                }
            ]
        },

        // "never"
        {
            code: "var obj = {\nk1: 'val1',\nk2: 'val2',\nk3: 'val3'\n};",
            output: "var obj = {\nk1: 'val1', k2: 'val2', k3: 'val3'\n};",
            options: ["never"],
            errors: [
                {
                    message: "No two properties of an object may be on different lines.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 1
                },
                {
                    message: "No two properties of an object may be on different lines.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 1
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1'\n, k2: 'val2'\n, k3: 'val3'\n};",
            output: "var obj = {\nk1: 'val1' , k2: 'val2' , k3: 'val3'\n};",
            options: ["never"],
            errors: [
                {
                    message: "No two properties of an object may be on different lines.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 3
                },
                {
                    message: "No two properties of an object may be on different lines.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 3
                }
            ]
        },
        {
            code: "var obj = {k1: 'val1',\nk2: 'val2',\nk3: 'val3'};",
            output: "var obj = {k1: 'val1', k2: 'val2', k3: 'val3'};",
            options: ["never"],
            errors: [
                {
                    message: "No two properties of an object may be on different lines.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 1
                },
                {
                    message: "No two properties of an object may be on different lines.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var obj = {\n[bar]: 'baz',\nbaz\n};",
            output: "var obj = {\n[bar]: 'baz', baz\n};",
            options: ["never"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two properties of an object may be on different lines.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1',\nk2: 'val2',\n...{}\n};",
            output: "var obj = {\nk1: 'val1', k2: 'val2', ...{}\n};",
            options: ["never"],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "No two properties of an object may be on different lines.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 1
                },
                {
                    message: "No two properties of an object may be on different lines.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 1
                }
            ]
        },
        {
            code: "foo({k1: 'val1',\nk2: 'val2'});",
            output: "foo({k1: 'val1', k2: 'val2'});",
            options: ["never"],
            errors: [
                {
                    message: "No two properties of an object may be on different lines.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            code: "foo({\na,\nb,\n});",
            output: "foo({\na, b,\n});",
            options: ["never"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two properties of an object may be on different lines.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 4
                }
            ]
        },

        // "never", { unlessCommaBefore: true }
        {
            code: "var obj = {\nk1: 'val1',\nk2: 'val2',\nk3: 'val3'\n};",
            output: "var obj = {\nk1: 'val1', k2: 'val2', k3: 'val3'\n};",
            options: ["never", { unlessCommaBefore: true }],
            errors: [
                {
                    message: "No two properties of an object may be on different lines unless the second property starts on the same line as the delimiting comma.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 1
                },
                {
                    message: "No two properties of an object may be on different lines unless the second property starts on the same line as the delimiting comma.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 1
                }
            ]
        },
        {
            code: "var obj = {k1: 'val1',\nk2: 'val2',\nk3: 'val3'};",
            output: "var obj = {k1: 'val1', k2: 'val2', k3: 'val3'};",
            options: ["never", { unlessCommaBefore: true }],
            errors: [
                {
                    message: "No two properties of an object may be on different lines unless the second property starts on the same line as the delimiting comma.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 1
                },
                {
                    message: "No two properties of an object may be on different lines unless the second property starts on the same line as the delimiting comma.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var obj = {\n[bar]: 'baz',\nbaz\n};",
            output: "var obj = {\n[bar]: 'baz', baz\n};",
            options: ["never", { unlessCommaBefore: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two properties of an object may be on different lines unless the second property starts on the same line as the delimiting comma.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var obj = {\nk1: 'val1',\nk2: 'val2',\n...{}\n};",
            output: "var obj = {\nk1: 'val1', k2: 'val2', ...{}\n};",
            options: ["never", { unlessCommaBefore: true }],
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { experimentalObjectRestSpread: true } },
            errors: [
                {
                    message: "No two properties of an object may be on different lines unless the second property starts on the same line as the delimiting comma.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 1
                },
                {
                    message: "No two properties of an object may be on different lines unless the second property starts on the same line as the delimiting comma.",
                    type: "ObjectExpression",
                    line: 4,
                    column: 1
                }
            ]
        },
        {
            code: "foo({k1: 'val1',\nk2: 'val2'});",
            output: "foo({k1: 'val1', k2: 'val2'});",
            options: ["never", { unlessCommaBefore: true }],
            errors: [
                {
                    message: "No two properties of an object may be on different lines unless the second property starts on the same line as the delimiting comma.",
                    type: "ObjectExpression",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            code: "foo({\na,\nb,\n});",
            output: "foo({\na, b,\n});",
            options: ["never", { unlessCommaBefore: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "No two properties of an object may be on different lines unless the second property starts on the same line as the delimiting comma.",
                    type: "ObjectExpression",
                    line: 3,
                    column: 4
                }
            ]
        }

    ]

});
