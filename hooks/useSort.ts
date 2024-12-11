"use client";

export default function useSort<T>({
  data,
  key,
  order
}: {
  data: T[];
  key?: string;
  order: "asc" | "desc";
}) {
  const compareValues = (a: any, b: any) => {
    let valA = key ? a[key] : a;
    let valB = key ? b[key] : b;

    if (valA == null && valB != null) return -1;
    if (valA != null && valB == null) return 1;
    if (valA == null && valB == null) return 0;

    if (typeof valA === "boolean" && typeof valB === "boolean") {
      return valA === valB ? 0 : valA ? 1 : -1;
    }

    if (valA instanceof Date && valB instanceof Date) {
      return valA.getTime() - valB.getTime();
    }

    if (typeof valA === "string" && typeof valB === "string") {
      return valA.localeCompare(valB);
    }

    if (typeof valA === "number" && typeof valB === "number") {
      return valA - valB;
    }

    if (typeof valA === "object" && typeof valB === "object") {
      return JSON.stringify(valA).localeCompare(JSON.stringify(valB));
    }

    return 0;
  };

  return data.sort((a, b) => {
    const result = compareValues(a, b);
    return order === "asc" ? result : -result;
  });
}
