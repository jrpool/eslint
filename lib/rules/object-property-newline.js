/**
 * @fileoverview Rule to enforce placing object properties on separate lines.
 * @author Vitor Balocco
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "regulate whether object-literal properties are on separate lines",
            category: "Stylistic Issues",
            recommended: false
        },

        schema: [
            {
                enum: ["always", "never"]
            },
            {
                type: "object",
                properties: {
                    allowAllPropertiesOnSameLine: {
                        type: "boolean"
                    },
                    allowMultiplePropertiesPerLine: { // Deprecated
                        type: "boolean"
                    },
                    treatComputedPropertiesLikeJSCS: {
                        type: "boolean"
                    },
                    noCommaFirst: {
                        type: "boolean"
                    },
                    unlessCommaBefore: {
                        type: "boolean"
                    }
                },
                additionalProperties: false
            }
        ],

        fixable: "whitespace"
    },

    create(context) {
        const never = context.options[0] === "never";
        let allowSameLine, allowOpenBracket, denyCommaFirst, allowCommaBefore;
        if (never) {
            allowCommaBefore = context.options[1] && Boolean(context.options[1].unlessCommaBefore;
        }
        else {
            const objectIndex = context.options.length - 1;
            allowSameLine = context.options[objectIndex] && (
                Boolean(context.options[objectIndex].allowAllPropertiesOnSameLine) ||
                Boolean(context.options[objectIndex].allowMultiplePropertiesPerLine) // Deprecated
            );
            allowOpenBracket = context.options[objectIndex] && Boolean(context.options[objectIndex].treatComputedPropertiesLikeJSCS);
            denyCommaFirst = context.options[objectIndex] && Boolean(context.options[objectIndex].noCommaFirst);
        }
        let errorMessage;
        if (never && allowCommaBefore) {
            errorMessage = "No two properties of an object may be on different lines unless the second property starts on the same line as the delimiting comma.";
        }
        else if (never) {
            errorMessage = "No two properties of an object may be on different lines.";
        }
        else {
            errorMessage = allowSameLine
                ? "No two object properties may be on the same line if they aren't all on the same line."
                : "No two object properties may be on the same line.";

            if (allowOpenBracket) {
                errorMessage += " The opening bracket of a computed property name may end a line on which another property appears.";
            }

            if (denyCommaFirst) {
                errorMessage += " The comma delimiting two properties may not share a line with any of the second property.";
            }
        }

        const sourceCode = context.getSourceCode();

        /**
         * Returns whether a token is a line-ending open bracket.
         * @param {token} myToken0 Token.
         * @param {sourceCode} source sourceCode of an object literal.
         * @param {number} myLine Number of line on which token appears.
         * @returns {boolean} Whether token is a line-ending open bracket.
         * Normally, myToken0 is the first token of the object literal.
         */
        function isTrailingOpenBracket(myToken0, source, myLine) {
            return myToken0.type === "Punctuator" &&
                myToken0.value === "[" &&
                source.getTokenAfter(myToken0).loc.start.line > myLine;
        }

        /**
         * Returns whether the token before a token is a comma on the same line.
         * @param {token} myToken0 Token.
         * @param {sourceCode} source sourceCode of an object literal.
         * @param {number} myLine Number of line on which token appears.
         * @returns {boolean} Whether the token before token is a comma on the same line.
         * Normally, myToken0 is the first token of the object literal.
         */
        function followsSameLineComma(myToken0, source, myLine) {
            const tokenBeforeCurrentProperty = source.getTokenBefore(myToken0);

            return tokenBeforeCurrentProperty.type !== "Punctuator" ||
                tokenBeforeCurrentProperty.value !== "," ||
                tokenBeforeCurrentProperty.loc.end.line !== myLine;
        }

        return {
            ObjectExpression(node) {
                if (never && allowCommaBefore) {
                    for (let i = 1; i < node.properties.length; i++) {
                        const firstTokenOfCurrentProperty = sourceCode.getFirstToken(node.properties[i]),
                            currentPropertyStartLine = firstTokenOfCurrentProperty.loc.start.line;
                        let currentPropertyIsValid;

                        if (followsSameLineComma(firstTokenOfCurrentProperty, sourceCode, currentPropertyStartLine)) {
                            return null;
                        }

                        context.report({
                            node,
                            loc: firstTokenOfCurrentProperty.loc.start,
                            message: errorMessage,
                            fix(fixer) {
                                const comma = sourceCode.getTokenBefore(firstTokenOfCurrentProperty);
                                const rangeAfterComma = [comma.range[1], firstTokenOfCurrentProperty.range[0]];

                                // Don't perform a fix if there are any comments between the comma and the next property.
                                if (sourceCode.text.slice(rangeAfterComma[0], rangeAfterComma[1]).trim()) {
                                    return null;
                                }
                                return fixer.replaceTextRange(rangeAfterComma, " ");
                            }
                        });
                    }
                }
                else if (never) {
                    const properties = node.properties,
                        propertyCount = properties.length,
                        firstPropertyTokenStart = sourceCode.getFirstToken(properties[0]).loc.start,
                        lastPropertyTokenEnd = sourceCode.getLastToken(properties[propertyCount - 1]).loc.end,
                        sourceText = sourceCode.text,
                        propertiesText = sourceText.slice(firstPropertyTokenStart, lastPropertyTokenEnd);

                    if (lastPropertyTokenEnd.line === firstPropertyTokenStart.line) {
                        return;
                    }
                    else {
                        const tokens = sourceCode.getTokens(properties[0]);
                        tokens.push(sourceCode.getTokens(properties[propertyCount - 1]));
                        tokens.push(sourceCode.getTokensBetween(properties[0], properties[propertyCount - 1]));
                        for (let i = 1; i < tokens.length; i++) {
                            if (tokens[i].loc.start.line > tokens[i - 1].loc.end.line) {
                                context.report({
                                    node,
                                    loc: tokens[i].loc.start,
                                    message: errorMessage,
                                    fix(fixer) {
                                        const interTokenRange = [tokens[i - 1].range[1], tokens[i].range[0]];

                                        // Don't perform a fix if there are any comments between the prior and this token.
                                        if (sourceCode.text.slice(interTokenRange[0], interTokenRange[1]).trim()) {
                                            return;
                                        }

                                        return fixer.replaceTextRange(interTokenRange, " ");
                                    }
                                });
                            }
                        }
                    }
                    return;
                }
                else if (allowSameLine) {
                    if (node.properties.length > 1) {
                        const firstTokenOfFirstProperty = sourceCode.getFirstToken(node.properties[0]);
                        const lastTokenOfLastProperty = sourceCode.getLastToken(node.properties[node.properties.length - 1]);

                        if (firstTokenOfFirstProperty.loc.start.line === lastTokenOfLastProperty.loc.end.line) {

                            // All keys and values are on the same line
                            return;
                        }
                    }
                }
                else {
                    for (let i = 1; i < node.properties.length; i++) {
                        const lastTokenOfPreviousProperty = sourceCode.getLastToken(node.properties[i - 1]),
                            firstTokenOfCurrentProperty = sourceCode.getFirstToken(node.properties[i]),
                            previousPropertyEndLine = lastTokenOfPreviousProperty.loc.end.line,
                            currentPropertyStartLine = firstTokenOfCurrentProperty.loc.start.line,
                            currentPropertyIsOnNewLine = previousPropertyEndLine < currentPropertyStartLine;
                        let currentPropertyIsValid;

                        if (!allowOpenBracket && !denyCommaFirst) {
                            currentPropertyIsValid = currentPropertyIsOnNewLine;
                        } else {

                            if (allowOpenBracket && !denyCommaFirst) {
                                currentPropertyIsValid =
                                    currentPropertyIsOnNewLine ||
                                    isTrailingOpenBracket(firstTokenOfCurrentProperty, sourceCode, currentPropertyStartLine);
                            } else if (!allowOpenBracket && denyCommaFirst) {
                                currentPropertyIsValid =
                                    currentPropertyIsOnNewLine &&
                                    followsSameLineComma(firstTokenOfCurrentProperty, sourceCode, currentPropertyStartLine);
                            } else if (allowOpenBracket && denyCommaFirst) {

                                // A line containing only “, [” is valid here.
                                currentPropertyIsValid = isTrailingOpenBracket(firstTokenOfCurrentProperty, sourceCode, currentPropertyStartLine) || (
                                    currentPropertyIsOnNewLine &&
                                    followsSameLineComma(firstTokenOfCurrentProperty, sourceCode, currentPropertyStartLine)
                                );
                            }
                        }

                        if (!currentPropertyIsValid) {
                            context.report({
                                node,
                                loc: firstTokenOfCurrentProperty.loc.start,
                                message: errorMessage,
                                fix(fixer) {
                                    const comma = sourceCode.getTokenBefore(firstTokenOfCurrentProperty);
                                    const rangeAfterComma = [comma.range[1], firstTokenOfCurrentProperty.range[0]];

                                    // Don't perform a fix if there are any comments between the comma and the next property.
                                    if (sourceCode.text.slice(rangeAfterComma[0], rangeAfterComma[1]).trim()) {
                                        return;
                                    }

                                    return fixer.replaceTextRange(rangeAfterComma, "\n");
                                }
                            });
                        }
                    }
                }
            }
        };
    }
};
