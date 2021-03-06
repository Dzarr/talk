import { RequestHandler } from "express";
import ms from "ms";

export const noCacheMiddleware: RequestHandler = (req, res, next) => {
  // Set cache control headers to prevent browsers/cdn's from caching these
  // requests.
  res.set({
    "Cache-Control": "private, no-cache, no-store, must-revalidate",
    Expires: "-1",
    Pragma: "no-cache",
  });

  next();
};

export const cacheHeadersMiddleware = (
  duration?: string | false
): RequestHandler => {
  const maxAge = duration ? Math.floor(ms(duration) / 1000) : false;
  if (!maxAge) {
    return noCacheMiddleware;
  }

  return (req, res, next) => {
    // Set cache control headers to encourage browsers/cdn's to cache these
    // requests if we aren't in private mode.
    res.set({
      "Cache-Control": `public, max-age=${maxAge}`,
    });

    next();
  };
};
