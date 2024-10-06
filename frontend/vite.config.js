import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    
    proxy: {
      "/api": {
        target: "https://z-chat-soba.onrender.com", // Target backend server
        changeOrigin: true, // Changes the origin header to the target URL
      },
    },
  },
});
