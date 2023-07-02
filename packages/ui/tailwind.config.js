/** @type {import('tailwindcss').Config} */
const sharedConfig = require('@big/tailwind-config');
module.exports = {
    prefix  : 'ui-',
    presets : [sharedConfig],
    content : ['./src/**/*.{js,ts,jsx,tsx}']
};
