const OAUTH = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const API = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "",
  LEETCODE_URL: process.env.NEXT_PUBLIC_LEETCODE_URL || "",
  CALENDAR_URL: process.env.CALENDAR_URL || "",
};

export { OAUTH, API };
