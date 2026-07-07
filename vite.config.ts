import { defineConfig, type UserConfig, type LibraryFormats } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

const reactExternal = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  /^react\//,
  /^react-dom\//,
]


const commonConfig = {
  optimizeDeps: {
    include: ['react/jsx-runtime'],
  },
  plugins: [react()],
}

const libFormats: LibraryFormats[] = ['es']

const libConfig: UserConfig = {
  ...commonConfig,
  build: {
    lib: {
      entry: resolve(__dirname, './src'),
      name: 'nt-modal',
      formats: libFormats,
      fileName: (format) => `nt-modal.${format}.js`
    },
    rollupOptions: {
      external: reactExternal,
      output: {
        globals: {
          react: "React",
          'react-dom': 'ReactDom'
        },
        // Use `index.css` for css
        assetFileNames: () => {
          // if (assetInfo.name == "style.css") return "nt-modal.css"
          return "nt-modal.css"
        }
      }
    }
  }
}

const demoConfig: UserConfig = {
  ...commonConfig,
  root: "./demo",
  base: process.env.NODE_ENV === 'production' ? '/react-nt-modal/' : '/',
  server: {
    port: 5910
  }
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const executionMode = mode || "lib";
  const modeValue = command === 'build' ? "production" : "development";

  if(executionMode === 'demo') {
    return { ...demoConfig, modeValue }
  } else {
    return { ...libConfig, modeValue }
  }
})
