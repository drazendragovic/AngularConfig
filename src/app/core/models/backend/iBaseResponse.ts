export interface IBaseResponse<T> {
  succeeded: boolean;
  message: string;
  errors: string[];
  data: { list: T[] };
}
