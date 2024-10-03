const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.resolver.extraNodeModules = {
    url: require.resolve('react-native-url-polyfill'), // Add the polyfill for URL
  };

  return config;
})();
