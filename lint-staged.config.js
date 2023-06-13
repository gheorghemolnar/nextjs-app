const { quote } = require('shell-quote');
const { ESLint } = require('eslint');

const eslint = new ESLint();
const isWin = process.platform === 'win32';

module.exports = {
    '**/*.{js,jsx,mjs,ts,tsx,mts}': (filenames) => {
        const escapedFileNames = filenames
            .map((filename) => (isWin ? filename : escape([filename])))
            .join(' ');
        return [
            `prettier --with-node-modules --ignore-path .prettierignore --write ${escapedFileNames}`,
            `eslint --config ./.eslintrc.js --fix ${filenames
                .filter(async (file) => await !eslint.isPathIgnored(file))
                .map((f) => `"${f}"`)
                .join(' ')}`,
            `git add ${escapedFileNames}`,
        ];
    },
    '**/*.{md,mdx,css,html,yml,yaml,scss}': (filenames) => {
        const escapedFileNames = filenames
            .map((filename) => (isWin ? filename : escape([filename])))
            .join(' ');
        return [
            `prettier --with-node-modules --ignore-path .prettierignore --write ${escapedFileNames}`,
            `git add ${escapedFileNames}`,
        ];
    },
    '**/*.{json,jsonc}': (filenames) => {
        const escapedFileNames = filenames
            .map((filename) => (isWin ? filename : escape([filename])))
            .join(' ');
        return [
            `eslint --config ./.eslintrc.js --fix ${filenames
                .filter(async (file) => await !eslint.isPathIgnored(file))
                .map((f) => `"${f}"`)
                .join(' ')}`,
            `git add ${escapedFileNames}`,
        ];
    },
};

function escape(str) {
    const escaped = quote(str);
    return escaped.replace(/\\@/g, '@');
}
