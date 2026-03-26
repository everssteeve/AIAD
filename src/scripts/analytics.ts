// Analytics utility module for Google Tag Manager integration
// Handles: consent management, GTM initialization, event tracking, language detection

// ─── Types ───────────────────────────────────────────────────────────────────

interface ConsentRecord {
  consent: "accepted" | "refused";
  timestamp: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "aiad-cookie-consent";
const THIRTEEN_MONTHS_MS = 13 * 30.44 * 24 * 60 * 60 * 1000; // ≈395 days

// ─── Consent Manager ─────────────────────────────────────────────────────────

export function getConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (
      (parsed.consent === "accepted" || parsed.consent === "refused") &&
      typeof parsed.timestamp === "number" &&
      parsed.timestamp > 0
    ) {
      return parsed as ConsentRecord;
    }
    return null;
  } catch {
    return null;
  }
}

export function setConsent(choice: "accepted" | "refused"): void {
  try {
    const record: ConsentRecord = {
      consent: choice,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage unavailable (private browsing, quota exceeded)
  }
}

export function isConsentValid(): boolean {
  const record = getConsent();
  if (!record) return false;
  return Date.now() - record.timestamp <= THIRTEEN_MONTHS_MS;
}

export function hasValidAcceptedConsent(): boolean {
  const record = getConsent();
  if (!record) return false;
  if (Date.now() - record.timestamp > THIRTEEN_MONTHS_MS) return false;
  return record.consent === "accepted";
}

// ─── GTM Initialization ─────────────────────────────────────────────────────

let gtmInitialized = false;

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function initGTM(containerId: string): void {
  if (gtmInitialized || !containerId) return;

  try {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Dynamically load GTM script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
    document.head.appendChild(script);

    // Push GTM start event
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });

    gtmInitialized = true;
  } catch {
    // Silently fail if script loading is blocked (ad-blocker, network error)
  }
}

// ─── Event Tracking ──────────────────────────────────────────────────────────

export function trackEvent(
  name: string,
  params?: Record<string, string | number>
): void {
  if (!gtmInitialized) return;

  try {
    window.dataLayer.push({
      event: name,
      ...params,
    });
  } catch {
    // no-op if dataLayer not available
  }
}

// ─── Language Detection ──────────────────────────────────────────────────────

export function detectLanguage(): "fr" | "en" {
  try {
    const lang = navigator.language || "";
    return lang.startsWith("en") ? "en" : "fr";
  } catch {
    return "fr";
  }
}
