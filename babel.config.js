module.exports = function (api) {
  const isTest = api.env("test");
  api.cache(!isTest);

  return {
    presets: [
      [
        "babel-preset-expo",
        { jsxImportSource: isTest ? undefined : "nativewind" },
      ],
      ...(isTest ? [] : ["nativewind/babel"]),
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            ".ios.js",
            ".android.js",
            ".js",
            ".ts",
            ".tsx",
            ".json",
            ".png",
          ],
          alias: {
            api: "./src/api",
            screens: "./src/screens",
            utils: "./src/utils",
            theme: "./src/theme",
            components: "./src/components",
            atoms: "./src/components/atoms",
            molecules: "./src/components/molecules",
            icons: "./src/components/icons",
            navigation: "./src/navigation",
            store: "./src/store",
            hooks: "./src/hooks",
            types: "./src/types",
            "@constants": "./src/constants",
            config: "./src/config",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
