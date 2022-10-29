import { defineConfig, ServerOptions } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";
import { readFileSync } from "fs";

let server: ServerOptions;

const getServerConfig = (mode: string): ServerOptions => {
  const basicEnvFileName = ".env";
  const currentModeEnvFileName = `${basicEnvFileName}.${mode}`;
  const {
    VITE_HOST: host,
    VITE_PORT: port,
    VITE_BACKEND_PREFIX: backendPrefix,
    VITE_PROXY_DOMAIN: target,
  } = dotenv.parse(readFileSync(currentModeEnvFileName));
  return {
    host,
    port,
    proxy: {
      [backendPrefix]: {
        target,
      },
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  server = getServerConfig(mode);
  return {
    plugins: [vue()],
    server,
  };
});
