# enforce placing object properties on separate lines (object-property-newline)

This rule permits you to restrict the locations of property specifications in object literals. You may require or prohibit the appearance of property specifications on different lines from each other. You may also make some
exceptions to such a restriction.

## Rule Details

### Motivations

This rule makes it possible to ensure, as some style guides require, that property specifications appear on separate lines for better readability. For example, you can prohibit all of these:

```js
const newObject = {a: 1, b: [2, {a: 3, b: 4}]};
const newObject = {
    a: 1, b: [2, {a: 3, b: 4}]
};
const newObject = {
    a: 1,
    b: [2, {a: 3, b: 4}]
};
const newObject = {
    a: 1,
    b: [
        2,
        {a: 3, b: 4}
    ]
};

```

Instead of those, you can comply with that requirement by writing

```js
const newObject = {
    a: 1,
    b: [2, {
        a: 3,
        b: 4
    }]
};
```

or

```js
const newObject = {
    a: 1,
    b: [
        2,
        {
            a: 3,
            b: 4
        }
    ]
};
```

Another benefit of this requirement is specificity of diffs when a property is changed:

```diff
// More specific
 var obj = {
     foo: "foo",
-    bar: "bar",
+    bar: "bazz",
     baz: "baz"
 };
```

```diff
// Less specific
-var obj = { foo: "foo", bar: "bar", baz: "baz" };
+var obj = { foo: "foo", bar: "bazz", baz: "baz" };
```

Object literals whose properties appear one after the other on the same line are, however, more compact. Particularly if they use ES2015 shorthand notation, you may wish to avoid unnecessary vertical spacing by disallowing line separation among property specifications.

### Options

#### String Option

This rule has a string option, whose values may be `always` (default) or `never`. The `always` option requires an object’s property specifications to appear on separate lines. The `never` option prohibits them from doing so.

For each value of the string option, there is also at least one object option.

#### Object Options for `always`

The `always` string option can be qualified by up to three object options:

- `allowAllPropertiesOnSameLine`

If you set `allowAllPropertiesOnSameLine` to `true`, object literals such as the first two above, with all property specifications on the same line, will be permitted, but one like

```js
const newObject = {
    a: 'a.m.', b: 'p.m.',
    c: 'daylight saving time'
};

```

will be prohibited, because two properties, but not all properties, appear on the same line.

This option also has an older, and now deprecated, name, `allowMultiplePropertiesPerLine`.

- `treatComputedPropertiesLikeJSCS`

If you set `treatComputedPropertiesLikeJSCS` to `true`, an object literal such as the one below will be permitted:

```js
const newObject = {
    a: 1, [
        process.argv[4]
    ]: '01'
};
```

Otherwise, this rule will prohibit it, because ESLint treats the opening bracket of a computed property name as part of the property specification. The JSCS rule `requireObjectKeysOnNewLine` does not, so this object option makes ESLint compatible with JSCS in this respect.

- `noCommaFirst`

If you set `noCommaFirst` to `true`, an object literal such as the one below will be prohibited, even though all its property specifications are on separate lines:

```js
const newFunction = multiplier => ({
    a: 2 * multiplier
    , b: 4 * multiplier
    , c: 8 * multiplier
});
```

This object option makes the rule stricter by prohibiting one of the patterns by which you could comply with the rule. Specifically, the comma between two property specifications may not appear before the second one on the same line. The JSCS rule `requireObjectKeysOnNewLine` treats commas this way, so this object option makes ESLint compatible with JSCS in this respect.

#### Object Options for `never`

The `never` string option can be qualified by one object option: `unlessCommaBefore`.

Without this option, the `never` string option prohibits any part of any property specification from appearing on a later line than any part of the preceding property specification. That implies that a one-property object literal may occupy as many lines as you want, but an object literal with more than one property must have all of its property specifications confined to the same line.

With this option set to `true`, you make an exception for any non-initial property specification, if the comma that precedes it appears on the same line. This implies that an object literal can occupy as many lines as you want, if all of the commas between its property specifications precede the following property specifications on the same lines. Two common patterns permitted by this exception are:

- comma-first (each line begins with a comma, rather than ending with a comma)
- multiline expressions embedded in what would otherwise be single-line lists

### Notations

This rule applies equally to all property specifications, regardless of notation, including:

- `a: 1` (ES5)
- `a` (ES2015 shorthand property)
- ``[`prop${a}`]`` (ES2015 computed property name)

### Multiline Properties

The `always` string option prohibits the colocation on any line of at least 1 character of one property specification with at least 1 character of any other property specification. For example, the `always` option prohibits

```js
const newObject = {a: [
    'Officiële website van de Europese Unie',
    'Официален уебсайт на Европейския съюз'
], b: 2};
```

because 1 character of the specification of `a` (i.e. the trailing `]` of its value) is on the same line as the specification of `b`.

The `allowAllPropertiesOnSameLine` object option would not excuse this case, because the entire collection of property specifications spans 4 lines, not 1.

The `never` string option permits a multiline property specification if it is the only property specification of its object. If there are two or more property specifications, however, the `never` option generally makes it impossible for any of them to occupy more than one line. However, the `unlessCommaBefore` object option provides one exception, described above.

### --fix

If this rule is invoked with the command-line `--fix` option, object literals that violate the rule are generally modified to comply with the rule.

#### `--fix` with `always`

When the string option is set to `always` (or is, equivalently, not set), the modification in each case is to move a property specification to the next line whenever the previous property specification is at least partly on the same line. For example,

```js
const newObject = {
    a: 'a.m.', b: 'p.m.',
    c: 'daylight saving time'
};
```

is converted to

```js
const newObject = {
    a: 'a.m.',
b: 'p.m.',
    c: 'daylight saving time'
};
```

The modification does not depend on whether the `allowAllPropertiesOnSameLine` object option is set to `true`. In other words, ESLint never collects all the property specifications onto a single line, even when this object option would permit that.

ESLint does not correct a violation of this option if a comment appears between a property specification and the preceding comma on the same line, since ESLint cannot then determine which line to put the comment onto.

As illustrated above, the `--fix` option, applied to this option, does not comply with other rules, such as `indent`, but, if those other rules are also in effect, the option applies them, too.

#### `--fix` with `never`

## Examples

Examples of **incorrect** code for this rule, with all object options omitted or set to `false`:

```js
/*eslint object-property-newline: "error"*/

const obj = { foo: "foo", bar: "bar", baz: "baz" };

const obj = {
    foo: "foo", bar: "bar", baz: "baz"
};

const obj = {
    foo: "foo", bar: "bar",
    baz: "baz"
};

const obj = {
    [process.argv[3] ? "foo" : "bar"]: 0, baz: [
        1,
        2,
        4,
        8
    ]
};

const a = "antidisestablishmentarianistically";
const b = "yugoslavyalılaştırabildiklerimizdenmişsiniz";
const obj = {a, b};

const domain = process.argv[4];
const obj = {
    foo: "foo", [
    domain.includes(":") ? "complexdomain" : "simpledomain"
]: true};
```

Example of additional **incorrect** code for this rule with the `{ "noCommaFirst": true }` option:

```js
/*eslint object-property-newline: ["error", { "noCommaFirst": true }]*/

const obj = {
    foo: "foo"
    , bar: "bar"
    , baz: "baz"
};
```

Examples of **correct** code for this rule, with all object options omitted or set to `false`:

```js
/*eslint object-property-newline: "error"*/

const obj = {
    foo: "foo",
    bar: "bar",
    baz: "baz"
};

const obj = {
    foo: "foo"
    , bar: "bar"
    , baz: "baz"
};

const user = process.argv[2];
const obj = {
    user,
    [process.argv[3] ? "foo" : "bar"]: 0,
    baz: [
        1,
        2,
        4,
        8
    ]
};
```

Examples of additional **correct** code for this rule with the `{ "allowAllPropertiesOnSameLine": true }` option:

```js
/*eslint object-property-newline: ["error", { "allowAllPropertiesOnSameLine": true }]*/

const obj = { foo: "foo", bar: "bar", baz: "baz" };

const obj = {
    foo: "foo", bar: "bar", baz: "baz"
};
const user = process.argv[2];
const obj = {
    user, [process.argv[3] ? "foo" : "bar"]: 0, baz: [1, 2, 4, 8]
};
```

Example of additional **correct** code for this rule with the `{ "treatComputedPropertiesLikeJSCS": true }` option:

```js
/*eslint object-property-newline: ["error", { "treatComputedPropertiesLikeJSCS": true }]*/

const domain = process.argv[4];
const obj = {
    foo: "foo", [
    domain.includes(":") ? "complexdomain" : "simpledomain"
]: true};
```

## When Not To Use It

You can turn this rule off if you want to decide, case-by-case, whether to place property specifications on separate lines.

## Compatibility

- **JSCS**: [requireObjectKeysOnNewLine](http://jscs.info/rule/requireObjectKeysOnNewLine)

## Related Rules

- [brace-style](brace-style.md)
- [comma-dangle](comma-dangle.md)
- [key-spacing](key-spacing.md)
- [object-curly-spacing](object-curly-spacing.md)
