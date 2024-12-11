interface ISearch {
  value: any;
  query: string;
  filterOnlyBy?: string;
}

export default function deepSearch({
  value,
  query,
  filterOnlyBy
}: ISearch): boolean {
  const normalizedQuery = query.toLowerCase();

  const searchInValue = (val: any): boolean => {
    if (val == null) return false;

    if (
      typeof val === "string" ||
      typeof val === "number" ||
      val instanceof Date
    ) {
      return val.toString().toLowerCase().includes(normalizedQuery);
    }

    if (Array.isArray(val)) {
      return val.some((item) => searchInValue(item));
    }

    if (typeof val === "object") {
      if (filterOnlyBy && val.hasOwnProperty(filterOnlyBy)) {
        return searchInValue(val[filterOnlyBy]);
      }
      return Object.values(val).some(searchInValue);
    }

    return false;
  };

  return searchInValue(value);
}
