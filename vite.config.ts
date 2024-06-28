import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  test: {
    setupFiles: [path.resolve(__dirname, 'tests', 'vitest.setup.ts')]
  },
  plugins: [tsconfigPaths()]
})
