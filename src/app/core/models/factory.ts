export interface Factory<T> {
  instance: () => T;
}
