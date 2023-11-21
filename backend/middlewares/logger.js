import model from "mongoose";

export function logger(req, res, next) {
  const ts = new Date();
  console.log(`[${ts}]: ${req.method} ${req.originalUrl}`);
  next();
}

