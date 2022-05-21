// this is automatically detected by playground/vitestSetup.ts and will replace
// the default e2e test serve behavior

import path from 'path'
import kill from 'kill-port'
import { hmrPorts, isBuild, ports, rootDir } from '~utils'

export const port = ports['ssr-vue']

export async function serve() {
  if (isBuild) {
    // build first
    const { build } = await import('vite')
    // client build
    await build({
      root: rootDir,
      logLevel: 'silent', // exceptions are logged by Vitest
      build: {
        target: 'esnext',
        minify: false,
        ssrManifest: true,
        outDir: 'dist/client'
      }
    })
    // server build
    await build({
      root: rootDir,
      logLevel: 'silent',
      build: {
        target: 'esnext',
        ssr: 'src/entry-server.js',
        outDir: 'dist/server'
      }
    })
  }

  await kill(port)

  const { createServer } = require(path.resolve(rootDir, 'server.js'))
  const { app, vite } = await createServer(
    rootDir,
    isBuild,
    hmrPorts['ssr-vue']
  )

  return new Promise((resolve, reject) => {
    try {
      const server = app.listen(port, () => {
        resolve({
          // for test teardown
          async close() {
            await new Promise((resolve) => {
              server.close(resolve)
            })
            if (vite) {
              await vite.close()
            }
          }
        })
      })
    } catch (e) {
      reject(e)
    }
  })
}
