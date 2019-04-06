module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: "airbnb-base",
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    rules: {
        "quotes": ["error", "double"],
        "no-underscore-dangle": ["error", { "allowAfterThis": true }],
        "no-param-reassign": ["error", { "props": false }],
        "class-methods-use-this": ["error", { "exceptMethods": ["renderStyle"] }],
        "indent": ["error", 4, { "ignoredNodes": ["TemplateLiteral *"], "SwitchCase": 1 }]
    },
};
