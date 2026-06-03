export interface ApiError {
  status: number;
  message: string; // string[] is normalized to single string in apiFetch
  code?: string; // Can hold 'Conflict', 'UNAUTHORIZED', etc.
}
