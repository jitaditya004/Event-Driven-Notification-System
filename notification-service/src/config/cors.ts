const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") ?? [];

export const corsOptions = {
  origin(origin: string | undefined, callback: Function) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Blocked by CORS"));
  },

  credentials: true,
};
