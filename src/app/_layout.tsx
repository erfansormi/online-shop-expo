// if (__DEV__) {
//   import("../../ReactotronConfig");
// }
// import React, { useEffect } from "react";
// import { Stack } from "expo-router";
// import { useFonts } from "expo-font";
// import { I18nManager } from "react-native";
// import * as SecureStore from "expo-secure-store";
// import ToastProvider from "@/libs/toast-provider";
// import { useIsAuthenticated } from "@/hooks/auth/useIsAuthenticated";
// import { SWRConfig } from "swr";
// import axiosInstance from "@/libs/axios";

// const isLoggedIn = SecureStore.getItem("token");
// export const unstable_settings = {
//   initialRouteName: isLoggedIn ? "(home)/index" : "auth/login/index",
// };

// const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

// const Layout = () => {
//   useIsAuthenticated();
//   I18nManager.allowRTL(true);
//   I18nManager.forceRTL(true);
//   I18nManager.swapLeftAndRightInRTL(false);

//   useEffect(() => {
//     if (!I18nManager.isRTL) {
//       I18nManager.allowRTL(true);
//       I18nManager.forceRTL(true);
//       I18nManager.swapLeftAndRightInRTL(false);
//     }
//   }, []);

//   const [fontsLoaded] = useFonts({
//     vazirLight: require("../../assets/fonts/Vazirmatn-Light.ttf"),
//     vazir: require("../../assets/fonts/Vazirmatn-Medium.ttf"),
//     vazirBold: require("../../assets/fonts/Vazirmatn-Bold.ttf"),
//     vazirBlack: require("../../assets/fonts/Vazirmatn-Black.ttf"),
//   });

//   if (!fontsLoaded) return null;
//   return (
//     <SWRConfig value={{ errorRetryCount: 10, fetcher }}>
//       <ToastProvider>
//         <Stack
//           screenOptions={{
//             headerShown: false,
//             contentStyle: { backgroundColor: "#fff" },
//             navigationBarColor: "#fff",
//             statusBarColor: "#fff",
//             statusBarStyle: "dark",
//           }}
//         />
//       </ToastProvider>
//     </SWRConfig>
//   );
// };

// export default Layout;

if (__DEV__) {
  import("../../ReactotronConfig");
}
import * as Font from "expo-font";
import { Stack } from "expo-router";
import { SWRConfig } from "swr";
import axiosInstance from "@/libs/axios";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as SecureStore from "expo-secure-store";
import ToastProvider from "@/libs/toast-provider";
import { useIsAuthenticated } from "@/hooks/auth/useIsAuthenticated";
import { I18nManager, View, ActivityIndicator } from "react-native";
import LoadingScreen from "@/components/common/loading-screen";

const isLoggedIn = SecureStore.getItem("token");
export const unstable_settings = {
  initialRouteName: isLoggedIn ? "(home)/index" : "auth/login/index",
};

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const Layout = () => {
  useIsAuthenticated();
  const [isReady, setIsReady] = useState(false);
  const [isRTLConfigured, setIsRTLConfigured] = useState(false);

  const loadResourcesAndDataAsync = async () => {
    try {
      await I18nManager.allowRTL(true);
      await I18nManager.forceRTL(true);
      await I18nManager.swapLeftAndRightInRTL(false);
      setIsRTLConfigured(true);

      await Font.loadAsync({
        vazirLight: require("../../assets/fonts/Vazirmatn-Light.ttf"),
        vazir: require("../../assets/fonts/Vazirmatn-Medium.ttf"),
        vazirBold: require("../../assets/fonts/Vazirmatn-Bold.ttf"),
        vazirBlack: require("../../assets/fonts/Vazirmatn-Black.ttf"),
      });
    } catch (error) {
      console.warn(error);
    } finally {
      setIsReady(true);
    }
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadResourcesAndDataAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  if (!isRTLConfigured) {
    return <LoadingScreen />;
  }

  return (
    <SWRConfig value={{ errorRetryCount: 10, fetcher }}>
      <ToastProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#fff" },
            navigationBarColor: "#fff",
            statusBarColor: "#fff",
            statusBarStyle: "dark",
          }}
        />
      </ToastProvider>
    </SWRConfig>
  );
};

export default Layout;
