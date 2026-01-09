export interface StorageAdapter {
  getString(key: string): string | null;
  setString(key: string, value: string): void;
  delete(key: string): void;
  clear(): void;
}
