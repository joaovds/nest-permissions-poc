export interface DatabaseInterface {
  query<T>(queryStr: string, params?: any[]): QueryResponse<T>;
}

export interface QueryResponse<T> {
  getOne: () => Promise<T | null>;
  getMany: () => Promise<T[]>;
}
