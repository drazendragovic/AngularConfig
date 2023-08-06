export interface Entity {
  id: string;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
