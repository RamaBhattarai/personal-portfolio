/** Splits items into `rowCount` rows as evenly as possible, front rows absorbing the remainder. */
export function distributeIntoRows<T>(items: T[], rowCount: number): T[][] {
  const rows: T[][] = [];
  const base = Math.floor(items.length / rowCount);
  let remainder = items.length % rowCount;
  let cursor = 0;

  for (let r = 0; r < rowCount; r++) {
    const count = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;
    rows.push(items.slice(cursor, cursor + count));
    cursor += count;
  }

  return rows;
}
