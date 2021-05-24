import axios from "axios";

export const feAssetFormats = {
  js: "js",
  css: "css",
};

export const getFeAssets = (manifest, assetsPath, format, nonce) => {
  const list = Object.values(manifest)
    .filter((item) => item.includes(`.${format}`))
    .map((item) => {
      return format === feAssetFormats.js
        ? `<script src="${assetsPath}${item}" async></script>`
        : `<link href="${assetsPath}${item}" rel="stylesheet">\n`;
    });
  list.reverse();
  return list;
};

export const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  config.baseURL = typeof window !== "undefined" && window.__API_URL__;
  return config;
});
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);
