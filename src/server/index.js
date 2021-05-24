const dotenv = require("dotenv");
const express = require("express");
const app = express();
const path = require("path");
const es6Renderer = require("express-es6-template-engine");
const { feAssetFormats, getFeAssets } = require("../utils");

dotenv.config();

const PORT = process.env.PORT;

app.use(express.static("build/"));
app.engine("html", es6Renderer);
app.set("views", "src/server/views/");
app.set("view engine", "html");

const manifest = require("../../build/assets/manifest.json");

app.use((req, res, next) => {
  const assetsPath = "assets/";
  const scripts = getFeAssets(manifest, assetsPath, feAssetFormats.js);

  const cssEnvPrefix = ""; //process.env.REACT_APP_ENV === "local" ? "" : `-${process.env.REACT_APP_ENV}`;
  const styles = getFeAssets(manifest, assetsPath, feAssetFormats.css).map(
    (element) => {
      return element.replace(".css", `${cssEnvPrefix}.${feAssetFormats.css}`);
    }
  );

  const feConfig = { apiurl: process.env.API_URL };

  res.render("index", { locals: { scripts, styles, feConfig } });
});

app.listen(PORT, () =>
  console.log(
    // eslint-disable-line no-console
    `App Server is now running on http://localhost:${PORT}`
  )
);
