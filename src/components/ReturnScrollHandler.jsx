import { useLayoutEffect } from "react";
import {
  clearReturnState,
  consumePendingReturnScroll,
  getReturnState,
  hasPendingReturnScroll,
} from "../utils/navigationState";
import { restoreScrollPosition } from "../utils/scrollUtils";

export default function ReturnScrollHandler() {
  useLayoutEffect(() => {
    if (!hasPendingReturnScroll()) return;

    const state = getReturnState();
    consumePendingReturnScroll();

    if (!state) return;

    const applyRestore = () => {
      restoreScrollPosition(state);
      clearReturnState();
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(applyRestore);
    });

    const timer = setTimeout(applyRestore, 120);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
