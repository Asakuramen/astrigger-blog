import { useEffect } from "react";
import { useRouter } from "next/router";

import { existsGaId, pageview } from "lib/googleAnalytics/gtag";

export default function usePageView() {
  const router = useRouter();

  useEffect(() => {
    if (!existsGaId) {
      return;
    }

    const handleRouteChange = (path) => {
      pageview(path);
      console.log("GA pageview : " + path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
}
