import 'dotenv'

declare module 'dotenv' {
  export interface DotenvParseOutput {
    VITE_HOST: string
    VITE_PORT: number
    VITE_BACKEND_PREFIX: string
    VITE_PROXY_DOMAIN: string
  }
}
