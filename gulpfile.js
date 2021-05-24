const { src, dest } = require("gulp");

function defaultTask(cb) {
  src("./build/**/*.*").pipe(dest("./build/"));
  cb();
}

exports.default = defaultTask;
