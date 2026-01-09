import { MMKV, useMMKVString } from "react-native-mmkv";
import type { StorageAdapter } from "./storage.types";

export const storageInstance = new MMKV();

export const storage: StorageAdapter = {
  getString(key) {
    try {
      return storageInstance.getString(key) ?? null;
    } catch {
      return null;
    }
  },

  setString(key, value) {
    try {
      storageInstance.set(key, value);
    } catch {}
  },

  delete(key) {
    try {
      storageInstance.delete(key);
    } catch {}
  },

  clear() {
    try {
      storageInstance.clearAll();
    } catch {}
  },
};

/**
 * Native hook – thin wrapper around useMMKVString
 */
export function useStorageString(
  key: string,
): readonly [string | undefined, (value: string | undefined) => void] {
  const [value, setValue] = useMMKVString(key, storageInstance);

  const set = (next: string | undefined) => {
    setValue(next);
  };

  return [value, set] as const;
}
