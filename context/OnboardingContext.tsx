import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type OnboardingState = {
  homeAddress: string;
  homeLat: number | null;
  homeLon: number | null;
  workAddress: string;
  workLat: number | null;
  workLon: number | null;
  leaveHome: Date;
  leaveWork: Date;
  activeDays: boolean[]; // Mon..Sun
  pushToken: string | null;
};

type OnboardingContextValue = {
  state: OnboardingState;
  setHomeAddress: (value: string) => void;
  setHomeCoords: (lat: number, lon: number) => void;
  setWorkAddress: (value: string) => void;
  setWorkCoords: (lat: number, lon: number) => void;
  setLeaveHome: (value: Date) => void;
  setLeaveWork: (value: Date) => void;
  toggleDay: (index: number) => void;
  setPushToken: (value: string) => void;
};

function defaultTime(hours: number, minutes: number): Date {
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [homeAddress, setHomeAddressText] = useState("");
  const [homeLat, setHomeLat] = useState<number | null>(null);
  const [homeLon, setHomeLon] = useState<number | null>(null);
  const [workAddress, setWorkAddressText] = useState("");
  const [workLat, setWorkLat] = useState<number | null>(null);
  const [workLon, setWorkLon] = useState<number | null>(null);
  const [leaveHome, setLeaveHome] = useState(defaultTime(8, 0));
  const [leaveWork, setLeaveWork] = useState(defaultTime(16, 0));
  const [activeDays, setActiveDays] = useState([true, true, true, true, true, false, false]);
  const [pushToken, setPushToken] = useState<string | null>(null);

  const setHomeAddress = (value: string) => {
    setHomeAddressText(value);
    setHomeLat(null);
    setHomeLon(null);
  };

  const setHomeCoords = (lat: number, lon: number) => {
    setHomeLat(lat);
    setHomeLon(lon);
  };

  const setWorkAddress = (value: string) => {
    setWorkAddressText(value);
    setWorkLat(null);
    setWorkLon(null);
  };

  const setWorkCoords = (lat: number, lon: number) => {
    setWorkLat(lat);
    setWorkLon(lon);
  };

  const toggleDay = (index: number) => {
    setActiveDays((prev) => prev.map((value, i) => (i === index ? !value : value)));
  };

  const value = useMemo<OnboardingContextValue>(
    () => ({
      state: { homeAddress, homeLat, homeLon, workAddress, workLat, workLon, leaveHome, leaveWork, activeDays, pushToken },
      setHomeAddress,
      setHomeCoords,
      setWorkAddress,
      setWorkCoords,
      setLeaveHome,
      setLeaveWork,
      toggleDay,
      setPushToken,
    }),
    [homeAddress, homeLat, homeLon, workAddress, workLat, workLon, leaveHome, leaveWork, activeDays, pushToken]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within an OnboardingProvider");
  return ctx;
}
