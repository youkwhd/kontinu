import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/kontinu.ts",
  output: [
    {
      file: "dist/esm/kontinu.js",
      format: "es",
    },
    {
      file: "dist/umd/kontinu.js",
      format: "umd",
      name: "kontinu",
    },
  ],
  plugins: [typescript({ tsconfig: false })],
};
