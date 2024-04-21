import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
const Port = 8080;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": `http://localhost:${Port}`,
    },
  },
});

