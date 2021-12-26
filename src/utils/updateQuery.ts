import { QueryInput, Cache } from '@urql/exchange-graphcache';

export function updateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(queryInput, (data) => fn(result, data as any) as any);
}
