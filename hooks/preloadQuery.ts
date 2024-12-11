"use client";

import fetcher from "@/utils/fetcher";
import { preload } from "swr";

const preloadQuery = (url: string | null) => url && preload(url, fetcher);

export default preloadQuery;
