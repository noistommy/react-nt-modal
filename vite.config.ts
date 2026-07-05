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
      entry: resolve(__dirname, './src/index.tsx'),
      name: 'nt-modal',
      fileName: (format:any) => `nt-modal.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          'react-dom': 'ReactDom'
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

const demoConfig = {
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
