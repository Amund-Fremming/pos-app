import { useEffect, useState } from "react";
import { getJacketIntervals, getWeather, type JacketInterval } from "../../clients/backendClient";
import { useApiError } from "../../context/ApiErrorContext";
import { useOnboarding } from "../../context/OnboardingContext";
import type { WeatherOutcome } from "../shared/WeatherIcon/WeatherIcon";

/** `activeDays` is Mon..Sun; `Date.getDay()` is Sun..Sat. */
function isCommuteDay(activeDays: boolean[], today = new Date()): boolean {
  return activeDays[(today.getDay() + 6) % 7] === true;
}

export type Advice =
  | { kind: "commute"; outcome: WeatherOutcome }
  | { kind: "dayOff"; intervals: JacketInterval[] };

/**
 * On a commute day, the verdict for the trip itself. On a day off there's no trip
 * to judge, so it's the stretches of today you'd want a jacket for around home.
 */
export function useTodaysAdvice(): Advice | null {
  const { state } = useOnboarding();
  const { showApiError } = useApiError();
  const [advice, setAdvice] = useState<Advice | null>(null);

  const userId = state.userId;
  const commuteDay = isCommuteDay(state.activeDays);

  useEffect(() => {
    if (!userId) return;

    const fetchAdvice = async () => {
      if (commuteDay) {
        return setAdvice({ kind: "commute", outcome: await getWeather(userId) });
      }
      setAdvice({ kind: "dayOff", intervals: await getJacketIntervals(userId) });
    };

    const run = () =>
      fetchAdvice().catch((error) => {
        console.warn("Failed to fetch today's advice", error);
        showApiError(run);
      });
    run();
  }, [userId, commuteDay, showApiError]);

  return advice;
}
