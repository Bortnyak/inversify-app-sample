const env = process.env.NODE_ENV || "development";
const isDev = env === "development";
​
export default {
  env,
  isDev,
  jwtSecret: process.env.JWT_SECRET_KEY || "this should be replaced",
  jwtExpireTime: process.env.JWT_EXPIRE_TIME || 3600,
  corsOptions: {
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
      "Authorization"
    ],
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: process.env.CORS_ORIGIN || '*',
    preflightContinue: false,
    credentials: true
  },
  nodePort: process.env.NODE_PORT || 3000,
  apiRootPath: process.env.API_ROOT_PATH || "/observe-api/",
};