// utils/src/storage.ts
import { useCallback, useEffect, useState } from "react";
import type { StorageAdapter } from "./storage.types";

export const storage: StorageAdapter = {
  getString(key) {
    try {
      return typeof window !== "undefined" ? localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  },
  setString(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
  delete(key) {
    try {
      localStorage.removeItem(key);
    } catch {}
  },
  clear() {
    try {
      localStorage.clear();
    } catch {}
  },
};

/**
 * Web equivalent of useMMKVString
 * Signature intentionally matches native
 */
export function useStorageString(
  key: string,
  storage: StorageAdapter,
): readonly [string | undefined, (value: string | undefined) => void] {
  const [value, setValue] = useState<string | undefined>(() => {
    return storage.getString(key) ?? undefined;
  });

  useEffect(() => {
    const handler = () => {
      setValue(storage.getString(key) ?? undefined);
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key, storage]);

  const set = useCallback(
    (next: string | undefined) => {
      if (next === undefined) {
        storage.delete(key);
        setValue(undefined);
      } else {
        storage.setString(key, next);
        setValue(next);
      }
    },
    [key, storage],
  );

  return [value, set] as const;
}
