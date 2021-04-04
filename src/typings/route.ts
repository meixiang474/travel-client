export interface ServerMatch {
  path: string;
  url: string;
  isExact: boolean;
  params: Record<string, any>;
  query: Record<string, any>;
}
