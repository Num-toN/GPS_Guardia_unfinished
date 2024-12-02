module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react', // Ensure JSX is properly transpiled
  ],
  plugins: [
    [
      '@babel/plugin-transform-private-methods', 
      { loose: true }, // Enable 'loose' mode for private methods
    ],
    [
      '@babel/plugin-transform-private-property-in-object', 
      { loose: true }, // Enable 'loose' mode for private properties
    ],
    [
      '@babel/plugin-transform-class-properties', 
      { loose: true }, // Enable 'loose' mode for class properties
    ],
    // Disable FullStory plugin in development
    process.env.NODE_ENV === 'production' && [
      'fullstory-react-native', // FullStory's React Native plugin
      {
        // FullStory plugin configuration (optional)
      }
    ],
  ].filter(Boolean), // Filter out the FullStory plugin if not in production
};
