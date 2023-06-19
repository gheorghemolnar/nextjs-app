/** @type {import('tailwindcss').Config} */
const sharedConfig = require('@big/tailwind-config');
module.exports = {
    presets: [sharedConfig],
    content: [
        //include src files
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        // include packages because not transpiling
        '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
        '../../packages/forms/src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                sidebar: "300px auto", // for sidebar layout
                "sidebar-collapsed": "6'px auto" // for sidebar layout
            },
            // Adds a new breakpoi,nt in addition to the default breakpoints
            screens: {
                '3xl': '1600px',
            },
            colors: {
                // TODO: Temporary
                brand1main: '#D0E3D5',
                brand1sidebar: '#FBF9CB',
                brand2main: '#FBF9CB',
                brand2sidebar: '#89B5B8'
            }
        }
    }
};
