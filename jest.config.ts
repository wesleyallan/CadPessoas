import nextJest from "next/jest";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config({ path: ".env.development" }));

const createJestConfig = nextJest({
  dir: ".",
});

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testPathIgnorePatterns: ["/node_modules/*", "/.next/*"],
  preset: "ts-jest",
  rootDir: "./",
});

export default jestConfig;
