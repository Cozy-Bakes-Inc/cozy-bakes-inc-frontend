export const RESET_CONTEXT_KEY = "account_forgot_password_reset_context";
export const RESET_EMAIL_KEY = "account_forgot_password_email";
export const RESEND_TIMER_KEY = "account_verify_otp_resend_end_at";
export const RESEND_DURATION_SECONDS = 300;

export function getOrCreateEndAt() {
  const now = Date.now();

  if (typeof window === "undefined") {
    return now + RESEND_DURATION_SECONDS * 1000;
  }

  const savedEndAt = sessionStorage.getItem(RESEND_TIMER_KEY);
  const parsedEndAt = savedEndAt ? Number(savedEndAt) : NaN;
  const endAt =
    Number.isFinite(parsedEndAt) && parsedEndAt > now
      ? parsedEndAt
      : now + RESEND_DURATION_SECONDS * 1000;

  sessionStorage.setItem(RESEND_TIMER_KEY, String(endAt));
  return endAt;
}

export function getSecondsLeft(endAt: number) {
  return Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
}

export function createNextEndAt() {
  const nextEndAt = Date.now() + RESEND_DURATION_SECONDS * 1000;
  sessionStorage.setItem(RESEND_TIMER_KEY, String(nextEndAt));
  return nextEndAt;
}

export function clearResetContext() {
  sessionStorage.removeItem(RESET_CONTEXT_KEY);
  sessionStorage.removeItem(RESET_EMAIL_KEY);
  sessionStorage.removeItem(RESEND_TIMER_KEY);
}

export function setResetEmail(email: string) {
  sessionStorage.setItem(RESET_EMAIL_KEY, email);
}

export function getResetEmail() {
  return sessionStorage.getItem(RESET_EMAIL_KEY);
}

export function setResetContext(email: string, otp: string) {
  sessionStorage.setItem(
    RESET_CONTEXT_KEY,
    JSON.stringify({
      email,
      otp,
    }),
  );
}

export function getResetContext() {
  const raw = sessionStorage.getItem(RESET_CONTEXT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as {
      email?: string;
      otp?: string;
    };
  } catch {
    sessionStorage.removeItem(RESET_CONTEXT_KEY);
    return null;
  }
}
