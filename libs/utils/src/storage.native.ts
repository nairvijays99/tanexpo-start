import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  /**
   * Loads a string from storage.
   *
   * @param key The key to fetch.
   */
  async loadString(key: string): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ?? null;
    } catch {
      // not sure why this would fail... even reading the RN docs I'm unclear
      return null;
    }
  },

  /**
   * Saves a string to storage.
   *
   * @param key The key to fetch.
   * @param value The value to store.
   */
  async saveString(key: string, value: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Loads something from storage and runs it thru JSON.parse.
   *
   * @param key The key to fetch.
   */
  async load<T>(key: string): Promise<T | null> {
    let almostThere: string | null = null;
    try {
      almostThere = await this.loadString(key);
      return JSON.parse(almostThere ?? "") as T;
    } catch {
      return (almostThere as T) ?? null;
    }
  },

  /**
   * Saves an object to storage.
   *
   * @param key The key to fetch.
   * @param value The value to store.
   */
  async save(key: string, value: unknown): Promise<boolean> {
    try {
      return await this.saveString(key, JSON.stringify(value));
    } catch {
      return false;
    }
  },

  /**
   * Removes something from storage.
   *
   * @param key The key to kill.
   */
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {}
  },

  /**
   * Burn it all to the ground.
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch {}
  },
};
