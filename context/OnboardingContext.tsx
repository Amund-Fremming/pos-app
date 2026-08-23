import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getUserData } from "../clients/backendClient";
import { clearStoredUserId, getStoredUserId, setStoredUserId } from "../clients/userStorage";

export type OnboardingState = {
  userId: string | null;
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
  /** False until startup has checked for a stored user id (and, if found, loaded that user's data). */
  isReady: boolean;
  setUserId: (id: string) => void;
  setHomeAddress: (value: string) => void;
  setHomeCoords: (lat: number, lon: number) => void;
  setWorkAddress: (value: string) => void;
  setWorkCoords: (lat: number, lon: number) => void;
  setLeaveHome: (value: Date) => void;
  setLeaveWork: (value: Date) => void;
  toggleDay: (index: number) => void;
  setPushToken: (value: string) => void;
  /** Clears the stored user and resets onboarding state to defaults — for starting over. */
  resetUser: () => Promise<void>;
};

function defaultTime(hours: number, minutes: number): Date {
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d;
}

function parseTimeString(time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  return defaultTime(hours, minutes);
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

const DEFAULT_ACTIVE_DAYS = [true, true, true, true, true, false, false];

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [userId, setUserIdState] = useState<string | null>(null);
  const [homeAddress, setHomeAddressText] = useState("");
  const [homeLat, setHomeLat] = useState<number | null>(null);
  const [homeLon, setHomeLon] = useState<number | null>(null);
  const [workAddress, setWorkAddressText] = useState("");
  const [workLat, setWorkLat] = useState<number | null>(null);
  const [workLon, setWorkLon] = useState<number | null>(null);
  const [leaveHome, setLeaveHome] = useState(defaultTime(8, 0));
  const [leaveWork, setLeaveWork] = useState(defaultTime(16, 0));
  const [activeDays, setActiveDays] = useState(DEFAULT_ACTIVE_DAYS);
  const [pushToken, setPushToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const id = await getStoredUserId();
      if (!id) {
        setIsReady(true);
        return;
      }

      try {
        const data = await getUserData(id);
        setUserIdState(id);
        setHomeAddressText(data.home_display);
        setHomeLat(data.home_lat);
        setHomeLon(data.home_lon);
        setWorkAddressText(data.work_display);
        setWorkLat(data.work_lat);
        setWorkLon(data.work_lon);
        setLeaveHome(parseTimeString(data.home_time));
        setLeaveWork(parseTimeString(data.work_time));
        setActiveDays(data.alert_days);
        setPushToken(data.push_token ?? null);
      } catch (error) {
        console.warn("Failed to load stored user, starting over", error);
        await clearStoredUserId();
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const setUserId = (id: string) => {
    setUserIdState(id);
    setStoredUserId(id).catch((error) => console.warn("Failed to persist user id", error));
  };

  const resetUser = async () => {
    await clearStoredUserId();
    setUserIdState(null);
    setHomeAddressText("");
    setHomeLat(null);
    setHomeLon(null);
    setWorkAddressText("");
    setWorkLat(null);
    setWorkLon(null);
    setLeaveHome(defaultTime(8, 0));
    setLeaveWork(defaultTime(16, 0));
    setActiveDays(DEFAULT_ACTIVE_DAYS);
    setPushToken(null);
  };

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
      state: { userId, homeAddress, homeLat, homeLon, workAddress, workLat, workLon, leaveHome, leaveWork, activeDays, pushToken },
      isReady,
      setUserId,
      setHomeAddress,
      setHomeCoords,
      setWorkAddress,
      setWorkCoords,
      setLeaveHome,
      setLeaveWork,
      toggleDay,
      setPushToken,
      resetUser,
    }),
    [isReady, userId, homeAddress, homeLat, homeLon, workAddress, workLat, workLon, leaveHome, leaveWork, activeDays, pushToken]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within an OnboardingProvider");
  return ctx;
}
