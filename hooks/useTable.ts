"use client";

import { parseAsJson, parseAsString, useQueryState } from "nuqs";

import deepSearch from "@/utils/depthSearch";
import useQuery from "@/hooks/useQuery";
import useSort from "@/hooks/useSort";

export default function useTable<T>({
  path,
  searchKey = "search"
}: {
  path?: string;
  searchKey?: string;
}) {
  const [search, setSearch] = useQueryState(
    searchKey,
    parseAsString.withDefault("")
  );
  const [sortData, setSortData] = useQueryState(
    "sortData",
    parseAsJson(
      (value) => value as { key: string; order: "asc" | "desc" }
    ).withDefault({
      key: "",
      order: "asc"
    })
  );

  const {
    data: responseData = { data: [], total: 0 },
    isLoading,
    error,
    mutate: refetch
  } = useQuery<{ data: T[]; total: number }>(path || null);

  const data = Array.isArray(responseData.data)
    ? responseData.data
    : responseData?.data || [];
  const total = responseData.total;

  const sortedData = useSort<T>({
    data: data || [],
    key: sortData.key,
    order: sortData.order
  });

  const filteredData = sortedData.filter((item) =>
    deepSearch({ query: search, value: item })
  );

  const resetAll = () => {
    setSearch("");
    setSortData({ key: "", order: "asc" });
  };

  return {
    data: filteredData,
    isLoading,
    error,
    search,
    sortData,
    setSearch,
    setSortData,
    resetAll,
    refetch,
    total
  };
}
