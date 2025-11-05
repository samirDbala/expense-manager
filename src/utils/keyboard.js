// detect if user is on a mobile device
export function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// hide keyboard safely (blur active input)
export function hideKeyboard() {
  if (isMobileDevice()) {
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 100); // small delay to prevent instant refocus
  }
}

// hide keyboard when user presses Enter key
export function enableGlobalKeyboardHandler() {
  if (!isMobileDevice()) return;

  const handler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent refocus
      hideKeyboard();
    }
  };

  document.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
}

// hide keyboard when tapping outside any input or select
export function enableTapOutsideToHide() {
  if (!isMobileDevice()) return;

  const handler = (e) => {
    const target = e.target;
    if (
      target instanceof HTMLElement &&
      !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
    ) {
      hideKeyboard();
    }
  };

  document.addEventListener("touchstart", handler);
  return () => document.removeEventListener("touchstart", handler);
}
