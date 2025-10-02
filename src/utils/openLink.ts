// Simple helper to avoid in-app browser prompts (e.g., Messenger) when opening links.
// In-app browsers often show a confirmation when using target "_blank".
// We detect common in-app browsers and navigate in the same tab instead.

export function openLinkSafely(url: string): void {
  try {
    const userAgent = navigator.userAgent || '';
    const isFacebookApp = /FBAN|FBAV|FB_IAB|FBAN\//i.test(userAgent);
    const isInstagram = /Instagram/i.test(userAgent);
    const isMessenger = /Messenger/i.test(userAgent) || /FBAN\/.+Messenger/i.test(userAgent);
    const isInApp = isFacebookApp || isInstagram || isMessenger;

    if (isInApp) {
      window.location.href = url;
      return;
    }

    // Default behavior for normal browsers
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch {
    // Fallback
    window.location.href = url;
  }
}


