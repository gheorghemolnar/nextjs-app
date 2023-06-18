/** @type {import('tailwindcss').Config} */
const sharedConfig = require('@big/tailwind-config');
module.exports = {
    presets : [sharedConfig],
    content : [
        //include src files
        './src/**/*.{js,ts,jsx,tsx}',
    ],
};
