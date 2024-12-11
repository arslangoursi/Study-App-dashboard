import { useMemo } from "react";

interface DataItem {
  [key: string]: any;
}

interface Tab {
  name: string;
  number: number;
}

const useGenerateTabs = (
  data: DataItem[],
  statuses?: string[],
  key: string = "status"
): Tab[] => {
  const tabs = useMemo(() => {
    const statusMap: Record<string, number> = statuses
      ? Object.fromEntries(statuses.map((status) => [status.toLowerCase(), 0]))
      : {};

    data.forEach((item) => {
      const value = item[key]?.toLowerCase();
      if (value) {
        if (statuses) {
          if (value in statusMap) {
            statusMap[value]++;
          }
        } else {
          statusMap[value] = (statusMap[value] || 0) + 1;
        }
      }
    });

    const tabsArray = Object.entries(statusMap).map(([status, count]) => ({
      name: capitalizeAndFormat(status),
      number: count
    }));

    return [{ name: "All", number: data.length }, ...tabsArray];
  }, [data, statuses, key]);

  return tabs;
};

const capitalizeAndFormat = (status: string): string =>
  status.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

export default useGenerateTabs;
