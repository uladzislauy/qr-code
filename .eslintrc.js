module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "semi": ["error", "always"],
        "no-console": ["warn"],
    },
    "overrides": [
        {
            "files": [
                "**/*.test.js"
            ],
            "env": {
                "jest": true
            }
        }
    ]
};
