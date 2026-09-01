/**
 * Client for the pos-backend Rust service (see ../../pos-backend).
 */

import type { WeatherOutcome } from "../components/shared/WeatherIcon/WeatherIcon";
import { BASE_URL, IS_MOCK } from "../config";

export interface UserDataPayload {
  home_time: string;
  home_lat: number;
  home_lon: number;
  home_display: string;
  work_time: string;
  work_lat: number;
  work_lon: number;
  work_display: string;
  alert_days: boolean[];
  commute_minutes: number;
  push_token?: string;
}

export type UserDataPatchPayload = Partial<UserDataPayload>;

export interface UserData extends UserDataPayload {
  id: string;
}

/** Creates the user's commute config (onboarding completion). Returns the created row, including its id. */
export async function createUserData(payload: UserDataPayload): Promise<UserData> {
  if (IS_MOCK) return { id: "mock-user-id", ...payload };

  const res = await fetch(`${BASE_URL}/api/v1/user-data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Failed to create user data: ${res.status}`);
  return res.json();
}

/** Fetches the user's commute config by id. */
export async function getUserData(id: string): Promise<UserData> {
  if (IS_MOCK) {
    return {
      id,
      home_time: "08:00",
      home_lat: 59.9139,
      home_lon: 10.7522,
      home_display: "Home (mock)",
      work_time: "17:00",
      work_lat: 59.9139,
      work_lon: 10.7522,
      work_display: "Work (mock)",
      alert_days: [true, true, true, true, true, false, false],
      commute_minutes: 30,
    };
  }

  const res = await fetch(`${BASE_URL}/api/v1/user-data/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch user data: ${res.status}`);
  return res.json();
}

/** Patches the user's commute config by id (settings edits). Only the passed fields are updated. */
export async function patchUserData(id: string, payload: UserDataPatchPayload): Promise<UserData> {
  if (IS_MOCK) return { ...(await getUserData(id)), ...payload };

  const res = await fetch(`${BASE_URL}/api/v1/user-data/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Failed to update user data: ${res.status}`);
  return res.json();
}

/** Fetches the default weather outcome for the user's home screen. */
export async function getWeather(id: string): Promise<WeatherOutcome> {
  if (IS_MOCK) return "sun";

  const res = await fetch(`${BASE_URL}/api/v1/weather/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch weather: ${res.status}`);
  return res.json();
}
