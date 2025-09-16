import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/http/server.ts',
    'src/http/error-handler.ts',
    'src/lib/prisma.ts',
    'src/utils/create-slug.ts',
    'src/utils/get-user-permissions.ts',
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
  noExternal: ['@saas/auth', '@saas/env'],
})
