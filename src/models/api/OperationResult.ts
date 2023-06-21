export interface OperationResult<T> {
  isSuccessful: boolean;
  data?: T;
  error?: string;
}
