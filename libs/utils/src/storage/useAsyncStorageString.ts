import { useEffect, useState } from "react";

import { loadString, remove, saveString } from "./asyncStorage";

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

  const setStoredValue = (newValue: string | null) => {
    setValue(newValue);

    if (newValue === null) {
      remove(key);
    } else {
      saveString(key, newValue);
    }
  };

  return [value, setStoredValue];
}
