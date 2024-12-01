module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react', // Ensure JSX is properly transpiled
  ],
  plugins: [
    [
      '@babel/plugin-transform-private-methods', 
      { loose: true }, // Ensure 'loose' mode is enabled
    ],
    [
      '@babel/plugin-transform-private-property-in-object', 
      { loose: true }, // Ensure 'loose' mode is enabled
    ],
    [
      '@babel/plugin-transform-class-properties', 
      { loose: true }, // Ensure 'loose' mode is enabled for class properties
    ],
  ],
};
