const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, "../..");

// add workspace to watchFolders
config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// Ensure metro resolves symlinked packages (pnpm stores node_modules differently)
config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, "cjs", "ts", "tsx"],
  // optionally add resolver.extraNodeModules if needed
};

module.exports = config;
