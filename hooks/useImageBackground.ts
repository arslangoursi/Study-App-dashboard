"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import { useParams } from "next/navigation";
import useQuery from "@/hooks/useQuery";

export default function useImageBackground() {
  const { projectNumber, mapNumber } = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data: backgroundImage } = useQuery<string>(
    `/api/mapImage?projectNumber=${projectNumber}&mapNumber=${mapNumber}&isMobile=${isMobile}`,
    { keepPreviousData: false }
  );
  return backgroundImage;
}
