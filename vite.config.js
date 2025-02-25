import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        auth: resolve(__dirname, "./auth/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        post: resolve(__dirname, "./post/index.html"),
        createPost: resolve(__dirname, "./post/create/index.html"),
        about: resolve(__dirname, "./about/index.html"),
        story: resolve(__dirname, "./about/story/index.html"),
        terms: resolve(__dirname, "./terms/index.html"),
        privacy: resolve(__dirname, "./privacy/index.html"),
      },
    },
  },
});
