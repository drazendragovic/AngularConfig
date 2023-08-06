export interface OrderedItem {
  order?: number;
}

export function sortOrderedItems<T extends OrderedItem>(items: T[]): T[] {
  const defaultOrderingNumber = 9999;
  return items
    .map((val, index) => {
      val.order === defaultOrderingNumber ? val.order + index : val.order;
      return val;
    })
    .sort((a: OrderedItem, b: OrderedItem) => {
      const order1 = a.order ?? defaultOrderingNumber;
      const order2 = b.order ?? defaultOrderingNumber;

      if (order1 > order2) {
        return 1;
      } else if (order1 < order2) {
        return -1;
      } else {
        return 0;
      }
    });
}
