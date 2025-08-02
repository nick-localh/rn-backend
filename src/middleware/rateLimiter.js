import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-ratelimit");
    if (!success) {
      return res
        .status(420)
        .json({ message: "Too many requests,pls try again later..." });
    }
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default ratelimiter;
