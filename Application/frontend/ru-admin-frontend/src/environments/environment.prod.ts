export const environment = {
  production: false,
  apiUrl: (process.env["HOST"] || "http://0.0.0.0:") + (process.env["PORT"] || "17860")
};
