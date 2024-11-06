export default {
  expo: {
    owner: "leadlly-edusolustions",
    name: "Leadlly Mentor",
    slug: "leadlly-mentor",
    version: "1.0.1",
    scheme: "leadlly-mentor-app",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#6224e8",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#6224e8",
      },
      package: "com.leadllymentor.app",
      // googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      versionCode: 1,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-font",
      ["@react-native-google-signin/google-signin"],
      [
        "@react-native-community/datetimepicker",
        {
          android: {
            datePicker: {
              colorAccent: {
                light: "#9654F4",
                dark: "#9654F4",
              },
              textColor: {
                light: "#9654F4",
                dark: "#9654F4",
              },
              textColorPrimary: {
                light: "#9654F4",
                dark: "#9654F4",
              },
              textColorPrimaryInverse: {
                light: "#FFFFFF",
                dark: "#FFFFFF",
              },
              textColorSecondary: {
                light: "#7F7F7F",
                dark: "#7F7F7F",
              },
              textColorSecondaryInverse: {
                light: "#7F7F7F",
                dark: "#7F7F7F",
              },
              colorControlActivated: {
                light: "#9654F4",
                dark: "#9654F4",
              },
              colorControlHighlight: {
                light: "#9654F4",
                dark: "#9654F4",
              },
              windowBackground: {
                light: "#FFFFFF",
                dark: "#FFFFFF",
              },
            },
          },
        },
      ],
    ],
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "4318cc88-87a0-4a35-ac63-56855db50583",
      },
    },
  },
};
