import { defineConfig } from 'vite'
import { resolve } from 'path'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'


const commonConfig = {
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
}

const libConfig = {
  ...commonConfig,
  build: {
    lib: {
      entry: resolve(__dirname, './src'),
      name: 'nt-modal',
      fileName: (format:any) => `nt-modal.${format}.js`
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          vue: "React",
        },
        // Use `index.css` for css
        assetFileNames: (assetInfo:any) => {
          if (assetInfo.name == "style.css") return "nt-modal.css"
          return assetInfo.name
        }
      }
    }
  }
}

const demoConfig = defineConfig({
  ...commonConfig,
  root: "./demo",
  base: process.env.NODE_ENV === 'production' ? '/react-nt-modal/' : '/',
  server: {
    port: 5910
  }
})

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const executionMode = process.env.MODE || "lib";

  const mode = command === 'build' ? "production" : "development";

  if(executionMode === 'demo') {
    return { ...demoConfig, mode }
  } else {
    return { ...libConfig, mode }
  }
})
