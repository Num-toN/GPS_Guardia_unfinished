const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Get the default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Extract resolver configurations for extensions
const {
  resolver: { sourceExts, assetExts },
} = defaultConfig;

// Custom Metro configuration
const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, // Optimize bundle performance
      },
    }),
    unstable_allowRequireContext: true, // Required for Bridgeless Mode (React Native 0.72+)
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'), // Remove SVG from asset extensions
    sourceExts: [...sourceExts, 'svg', 'jsx', 'tsx'], // Add SVG, JSX, and TSX extensions
  },
};

// Merge the default Metro configuration with the custom one
module.exports = mergeConfig(defaultConfig, customConfig);
