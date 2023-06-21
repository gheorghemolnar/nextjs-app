import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()]
    //If we have a problem with the build, we will need to force include the dependencies from the monorepo
    //Keep it here so I remember the syntax
    // optimizeDeps : {
    //     include: ['@big/tailwindwonfig', '@big/ui'],
    // },
});
