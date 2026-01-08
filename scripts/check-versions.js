import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootPkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "package.json"), "utf8"));

const rootVersion = rootPkg.version;

// You may later read workspace dirs dynamically from pnpm-workspace.yaml
const workspaceDirs = ["packages/ui", "packages/features"];

let failed = false;

for (const rel of workspaceDirs) {
  const pjsonPath = path.resolve(__dirname, "..", rel, "package.json");

  if (!fs.existsSync(pjsonPath)) {
    console.warn(`Skipping missing ${pjsonPath}`);
    continue;
  }

  const pkg = JSON.parse(fs.readFileSync(pjsonPath, "utf8"));

  if (pkg.version !== rootVersion) {
    console.error(`${rel} has version ${pkg.version} but root version is ${rootVersion}`);
    failed = true;
  }
}

if (failed) {
  console.error(
    "❌ Version mismatch detected. Ensure all workspace package versions match the root version.",
  );
  process.exit(1);
}

console.log("✅ All workspace package versions match the root version.");
process.exit(0);
