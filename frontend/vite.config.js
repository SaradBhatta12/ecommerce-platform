import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false, // Consider setting this to false for development
      },
      "/uploads": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false, // Consider setting this to false for development
      },
    },
  },
});
