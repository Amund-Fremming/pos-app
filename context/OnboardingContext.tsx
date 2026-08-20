import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type OnboardingState = {
  homeAddress: string;
  workAddress: string;
  leaveHome: Date;
  leaveWork: Date;
  activeDays: boolean[]; // Mon..Sun
};

type OnboardingContextValue = {
  state: OnboardingState;
  setHomeAddress: (value: string) => void;
  setWorkAddress: (value: string) => void;
  setLeaveHome: (value: Date) => void;
  setLeaveWork: (value: Date) => void;
  toggleDay: (index: number) => void;
};

function defaultTime(hours: number, minutes: number): Date {
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [homeAddress, setHomeAddress] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [leaveHome, setLeaveHome] = useState(defaultTime(8, 0));
  const [leaveWork, setLeaveWork] = useState(defaultTime(16, 0));
  const [activeDays, setActiveDays] = useState([true, true, true, true, true, false, false]);

  const toggleDay = (index: number) => {
    setActiveDays((prev) => prev.map((value, i) => (i === index ? !value : value)));
  };

  const value = useMemo<OnboardingContextValue>(
    () => ({
      state: { homeAddress, workAddress, leaveHome, leaveWork, activeDays },
      setHomeAddress,
      setWorkAddress,
      setLeaveHome,
      setLeaveWork,
      toggleDay,
    }),
    [homeAddress, workAddress, leaveHome, leaveWork, activeDays]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within an OnboardingProvider");
  return ctx;
}
