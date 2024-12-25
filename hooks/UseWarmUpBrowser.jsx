import React from "react";
import * as WebBrowser from "expo-web-browser";

export const UseWarmUpBrowser = () => {
    React.useEffect(() => {
      void WebBrowser.warmUpAsync();
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }, []);
  };