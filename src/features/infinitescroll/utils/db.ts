export type CursorInfo<T> = {
  size: number;
  nextCursor: number;
  prevCursor: number;
  chunk: T[];
};

interface DB<T> {
  load: (start: number, limit: number) => Promise<CursorInfo<T>>;
}

export function db<T>(
  size = 100,
  pageSize = 10,
  getItem: (index: number) => T
): DB<T> {
  const items = Array(size)
    .fill(null)
    .map((_, index) => getItem(index));
  return {
    load: (start: number, limit: number = pageSize): Promise<CursorInfo<T>> => {
      const chunk = items.slice(start, start + limit);
      const cursorInfo = {
        chunk,
        nextCursor: start + limit,
        prevCursor: start,
        size: chunk.length
      };
      return new Promise((resolve) => resolve(cursorInfo));
    }
  };
}
