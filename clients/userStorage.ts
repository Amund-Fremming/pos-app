import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ID_KEY = "pos.userId";

/** The backend id for this device's user_data row, persisted across app restarts. */
export async function getStoredUserId(): Promise<string | null> {
  return AsyncStorage.getItem(USER_ID_KEY);
}

export async function setStoredUserId(id: string): Promise<void> {
  await AsyncStorage.setItem(USER_ID_KEY, id);
}

export async function clearStoredUserId(): Promise<void> {
  await AsyncStorage.removeItem(USER_ID_KEY);
}
