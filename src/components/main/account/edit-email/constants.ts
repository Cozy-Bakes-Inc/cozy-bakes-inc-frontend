export const EDIT_EMAIL_KEY = "account_edit_email_pending_context";
export const EDIT_EMAIL_RESEND_TIMER_KEY = "account_edit_email_resend_end_at";
export const EDIT_EMAIL_RESEND_DURATION_SECONDS = 300;

export type PendingEditEmailContext = {
  currentEmail: string;
  newEmail: string;
};

export function getOrCreateEditEmailEndAt() {
  const now = Date.now();

  if (typeof window === "undefined") {
    return now + EDIT_EMAIL_RESEND_DURATION_SECONDS * 1000;
  }

  const savedEndAt = sessionStorage.getItem(EDIT_EMAIL_RESEND_TIMER_KEY);
  const parsedEndAt = savedEndAt ? Number(savedEndAt) : NaN;
  const endAt =
    Number.isFinite(parsedEndAt) && parsedEndAt > now
      ? parsedEndAt
      : now + EDIT_EMAIL_RESEND_DURATION_SECONDS * 1000;

  sessionStorage.setItem(EDIT_EMAIL_RESEND_TIMER_KEY, String(endAt));
  return endAt;
}

export function getEditEmailSecondsLeft(endAt: number) {
  return Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
}

export function createNextEditEmailEndAt() {
  const nextEndAt = Date.now() + EDIT_EMAIL_RESEND_DURATION_SECONDS * 1000;
  sessionStorage.setItem(EDIT_EMAIL_RESEND_TIMER_KEY, String(nextEndAt));
  return nextEndAt;
}

export function setPendingEditEmailContext(
  context: PendingEditEmailContext,
) {
  sessionStorage.setItem(EDIT_EMAIL_KEY, JSON.stringify(context));
}

export function getPendingEditEmailContext(): PendingEditEmailContext | null {
  const value = sessionStorage.getItem(EDIT_EMAIL_KEY);
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<PendingEditEmailContext>;

    if (
      typeof parsed.currentEmail !== "string" ||
      typeof parsed.newEmail !== "string"
    ) {
      return null;
    }

    return {
      currentEmail: parsed.currentEmail,
      newEmail: parsed.newEmail,
    };
  } catch {
    return null;
  }
}

export function clearPendingEditEmail() {
  sessionStorage.removeItem(EDIT_EMAIL_KEY);
  sessionStorage.removeItem(EDIT_EMAIL_RESEND_TIMER_KEY);
}
