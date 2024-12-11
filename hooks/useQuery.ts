"use client";

import { SWROptions } from "@/interfaces";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

export default function useQuery<T>(url: string | null, options?: SWROptions) {
  return useSWR<T>(url, fetcher, { keepPreviousData: true, ...options });
}
