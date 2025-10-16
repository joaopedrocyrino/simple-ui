import { defineConfig } from "tsup";
import postcssModules from "postcss-modules";
import fs from "fs";
import postcss from "postcss";
import type { Plugin as ESBuildPlugin } from "esbuild";

let cssMap = new Map();

const cssModulesPlugin = (): ESBuildPlugin => {
  const cssMap = new Map<string, string>();

  return {
    name: "css-modules",
    setup(build) {
      build.onLoad({ filter: /\.css$/ }, async (args) => {
        const source = await fs.readFileSync(args.path, "utf8");
        let tokenMap: Record<string, string> = {};

        const result = await postcss([
          postcssModules({
            getJSON(_, json) {
              tokenMap = json;
            },
          }),
        ]).process(source, { from: args.path });

        cssMap.set(args.path, result.css);

        return {
          contents: `export default ${JSON.stringify(tokenMap)};`,
          loader: "js",
        };
      });

      build.onEnd(async () => {
        const cssBundle = Array.from(cssMap.values()).join("\n");
        await fs.writeFileSync("dist/styles.css", cssBundle, "utf8");
      });
    },
  };
};

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  loader: { ".css": "local-css" },
  onSuccess: async () => {
    // writes extracted CSS to dist/style.css
    const css = Array.from(cssMap.values()).join("\n");
    fs.writeFileSync("dist/style.css", css);
  },
  plugins: [cssModulesPlugin],
});
