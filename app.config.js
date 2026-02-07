import "dotenv/config";

export default {
  expo: {
    extra: {
      AUTH_BASE_URL: process.env.AUTH_BASE_URL,
      ISSUE_BASE_URL: process.env.ISSUE_BASE_URL,
      ANALYTICS_BASE_URL: process.env.ANALYTICS_BASE_URL,
    },
  },
};
