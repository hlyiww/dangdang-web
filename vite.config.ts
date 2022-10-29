import { defineConfig, ServerOptions } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";
import { readFileSync } from "fs";

let server: ServerOptions;

const getServerConfig = (mode: string): ServerOptions => {
  const MODE_CONFIG_MAP: { [key: string]: Array<string> } = {
    development: ["host", "port", "proxy"],
    production: ["host", "port"],
  };
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
    proxy: MODE_CONFIG_MAP[mode].includes("proxy")
      ? {
          [backendPrefix]: {
            target,
          },
        }
      : (null as any),
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
