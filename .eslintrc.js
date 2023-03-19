module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["airbnb", "airbnb-typescript"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": "off",
        "react/jsx-filename-extension": "off",
        "linebreak-style": "off",
        "react/function-component-definition": [2, { "namedComponents": "arrow-function" }],
        "react/require-default-props": 'off',
        "react/jsx-props-no-spreading": "off",
        "@typescript-eslint/semi": ['warn', 'never'],
        "consistent-return": "off"
    }
};