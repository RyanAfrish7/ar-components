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
        "class-methods-use-this": ["error", { "exceptMethods": ["renderStyle"] }],
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
        "indent": ["error", 4, { "ignoredNodes": ["TemplateLiteral *"], "SwitchCase": 1 }],
        "lines-between-class-members": ["error", { "exceptAfterSingleLine": true }],
        "no-param-reassign": ["error", { "props": false }],
        "no-underscore-dangle": ["error", { "allowAfterThis": true }],
        "quote-props": ["error", "consistent-as-needed"],
        "quotes": ["error", "double"],
    },
};
