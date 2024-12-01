const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Get the default config for your project
const defaultConfig = getDefaultConfig(__dirname);

// Extract resolver configurations for extensions
const {
  resolver: { sourceExts, assetExts },
} = defaultConfig;

// Create a custom configuration for Metro
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),  // SVG transformer for React Native
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,  // Disable experimental imports
        inlineRequires: true,  // Enable inline requires to optimize bundle performance
      },
    }),
  },
  resolver: {
    // Remove SVG from assetExts as it's handled by the transformer
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    // Add SVG to sourceExts so that Metro treats it as a source file
    sourceExts: [...sourceExts, 'svg'],
  },
};

// Merge the custom configuration with the default config and export
module.exports = mergeConfig(defaultConfig, config);
