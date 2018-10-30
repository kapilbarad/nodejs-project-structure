module.exports = {
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 8
    },
    "rules": {
        "object-curly-spacing": "off",
        "no-tabs": 0,
        "guard-for-in": 0,
        "max-len": ["error", { "code": 100, "ignoreComments": true }],
        "require-jsdoc": "off"
    }
};