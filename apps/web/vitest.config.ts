/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.test.tsx'],
    globals: true,
    environment: 'happy-dom',
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
