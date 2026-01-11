import { useCallback, useEffect, useState } from "react";

import { loadString, saveString, remove } from "./asyncStorage";

/**
 * AsyncStorage-backed replacement for useMMKVString
 */
export function useAsyncStorageString(
  key: string,
): [string | null, (value: string | null) => void] {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const storedValue = await loadString(key);
      if (mounted) {
        setValue(storedValue);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [key]);

  const setStoredValue = useCallback(
    (newValue: string | null) => {
      setValue(newValue);

      if (newValue === null) {
        remove(key);
      } else {
        saveString(key, newValue);
      }
    },
    [key],
  );

  return [value, setStoredValue];
}
