import { build } from "esbuild";
import { execSync } from "node:child_process";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CORE_SRC = path.join(ROOT, "packages/core/src/index.ts");
const CORE_DIST = path.join(ROOT, "packages/core/dist");

const sharedNode = {
  entryPoints: [CORE_SRC],
  bundle: true,
  platform: "node",
  target: "es2022",
  sourcemap: true,
  external: ["antlr4ng"],
  logLevel: "info",
};

async function main() {
  console.log("==> Bundling ESM...");
  await build({
    ...sharedNode,
    format: "esm",
    outfile: path.join(CORE_DIST, "index.mjs"),
  });

  console.log("==> Bundling CJS...");
  await build({
    ...sharedNode,
    format: "cjs",
    outfile: path.join(CORE_DIST, "index.cjs"),
  });

  // 浏览器可直接引入的单文件，通过 <script src="x-lang.min.js"> 暴露全局 XLang
  console.log("==> Bundling standalone (x-lang.min.js)...");
  await build({
    entryPoints: [CORE_SRC],
    bundle: true,
    platform: "browser",
    target: ["es2020", "chrome80", "firefox78", "safari14"],
    format: "iife",
    globalName: "XLang",
    minify: true,
    sourcemap: true,
    logLevel: "info",
    outfile: path.join(CORE_DIST, "x-lang.min.js"),
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  });

  console.log("==> Generating declarations...");
  execSync(
    "npx tsc --project packages/core/tsconfig.json --emitDeclarationOnly --declaration --outDir packages/core/dist",
    { cwd: ROOT, stdio: "inherit" },
  );

  console.log("==> Build complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
