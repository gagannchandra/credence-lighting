import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { hasPendingReturnScroll } from "../utils/navigationState";
import { scrollToTop } from "../utils/scrollUtils";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (hasPendingReturnScroll() && pathname === "/") {
      return;
    }

    scrollToTop(true);
  }, [pathname]);

  return null;
}
