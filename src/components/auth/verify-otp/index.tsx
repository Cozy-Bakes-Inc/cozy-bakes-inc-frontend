"use client";

import { useEffect, useMemo, useState } from "react";
import { VerifyOtpForm } from "./verify-otp-form";
import { VerifyOtpIntro } from "./components/verify-otp-intro";
import { formatTimer } from "@/lib/utils/time";

const RESEND_TIMER_KEY = "verify_otp_resend_end_at";
const RESEND_DURATION_SECONDS = 60;

function getOrCreateEndAt() {
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

function getSecondsLeft(endAt: number) {
  return Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
}

function getInitialTimerState() {
  const endAt = getOrCreateEndAt();
  return {
    endAt,
    secondsLeft: getSecondsLeft(endAt),
  };
}

export default function VerifyOtp() {
  const [timerState, setTimerState] = useState(getInitialTimerState);

  useEffect(() => {
    const updateTimer = () => {
      setTimerState((previous) => ({
        ...previous,
        secondsLeft: getSecondsLeft(previous.endAt),
      }));
    };

    const interval = window.setInterval(updateTimer, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const handleResendCode = () => {
    const nextEndAt = Date.now() + RESEND_DURATION_SECONDS * 1000;
    sessionStorage.setItem(RESEND_TIMER_KEY, String(nextEndAt));
    setTimerState({
      endAt: nextEndAt,
      secondsLeft: RESEND_DURATION_SECONDS,
    });
  };

  const canResendCode = timerState.secondsLeft === 0;
  const timerText = useMemo(
    () => formatTimer(timerState.secondsLeft),
    [timerState.secondsLeft],
  );

  return (
    <section className="content-stretch flex flex-col items-start justify-center gap-8 py-2">
      <VerifyOtpIntro />
      <VerifyOtpForm
        canResendCode={canResendCode}
        timerText={timerText}
        onResendCode={handleResendCode}
      />
    </section>
  );
}
