// storage.web.ts
export const storage = {
  async loadString(key: string) {
    try {
      return typeof window === "undefined" ? null : localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  async saveString(key: string, value: string) {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
      }
      return true;
    } catch {
      return false;
    }
  },

  async remove(key: string) {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch {}
  },

  async clear() {
    try {
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
    } catch {}
  },
};
