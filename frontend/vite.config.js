import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://192.168.1.14:4000", // Target backend server
        changeOrigin: true, // Changes the origin header to the target URL
      },
    },
  },
});
