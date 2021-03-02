module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    plugins: [
        "@typescript-eslint",
    ],
    "extends": "eslint:recommended",
    "rules": {
        "semi": ["error", "always"],
        "no-console": ["warn"],
    },
    "overrides": [
        {
            "files": [
                "./tests/*test.ts"
            ],
            "env": {
                "jest": true
            }
        }
    ]
};
