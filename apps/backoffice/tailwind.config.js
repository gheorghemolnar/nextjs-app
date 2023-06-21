/** @type {import('tailwindcss').Config} */
const sharedConfig = require('@big/tailwind-config');
module.exports = {
    presets : [sharedConfig],
    content : [
        //include src files
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        // include packages because not transpiling
        '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
        '../../packages/forms/src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                sidebar             : '300px auto', // for sidebar layout
                'sidebar-collapsed' : '64px auto' // for sidebar layout
            },
            // Adds a new breakpoi,nt in addition to the default breakpoints
            screens: {
                '3xl': '1600px'
            },
            colors: {
                //brand         : "#dc0b1c",
                brand         : 'hsl(355 90% 45%)',
                // TODO: Temporary
                brand1main    : '#f5f7fb',
                brand1sidebar : '#89B5B8'
                // brand2main: '#FBF9CB',
                // brand2sidebar: '#89B5B8'
            }
        }
    }
};
