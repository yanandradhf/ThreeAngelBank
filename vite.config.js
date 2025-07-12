import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // ⛔ Abaikan perubahan file db.json agar tidak trigger reload
      ignored: ["**/db.json"],
    },
  },
});
