// react imports
import { useEffect } from "react";
// react-router imports
import { useLocation } from "react-router-dom";

// utils imports
import {
  hideKeyboard,
  enableGlobalKeyboardHandler,
  enableTapOutsideToHide,
  isMobileDevice,
} from "./keyboard";

// component: handle keyboard behavior on mobile
export default function KeyboardManager() {
  // get current route
  const location = useLocation();

  // hide keyboard when route changes
  useEffect(() => {
    if (isMobileDevice()) {
      hideKeyboard();
    }
  }, [location.pathname]);

  // setup global keyboard + tap outside handlers
  useEffect(() => {
    const cleanup1 = enableGlobalKeyboardHandler();
    const cleanup2 = enableTapOutsideToHide();

    // cleanup listeners on unmount
    return () => {
      cleanup1?.();
      cleanup2?.();
    };
  }, []);

  // no UI - only behavior
  return null;
}
