/**
 * Client for the pos-backend Rust service (see ../../pos-backend).
 * Base URL comes from EXPO_PUBLIC_API_URL, falling back to the local dev server.
 */

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:6767";

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
  push_token?: string;
}

export type UserDataPatchPayload = Partial<UserDataPayload>;

/** Creates the user's commute config (onboarding completion). */
export async function createUserData(payload: UserDataPayload): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/v1/user-data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Failed to create user data: ${res.status}`);
}

/** Patches the user's commute config (settings edits). Only the passed fields are updated. */
export async function patchUserData(payload: UserDataPatchPayload): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/v1/user-data`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Failed to update user data: ${res.status}`);
}
