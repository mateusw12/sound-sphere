export type DeezerListResponse<T> = {
  data: T[];
  total?: number;
  next?: string;
};
