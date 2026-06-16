import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { aiCoachDevApi } from './plugins/aiCoachDevApi'

export default defineConfig({
  plugins: [react(), aiCoachDevApi()],
})
