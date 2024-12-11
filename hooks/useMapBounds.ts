import { MutableRefObject, useCallback, useEffect, useMemo } from "react";

import { calculateBounds } from "@/utils/helpers2d";

export default function useMapBounds({
  map,
  mapRef
}: {
  map: { geoJson: string };
  mapRef: MutableRefObject<any>;
}) {
  const bounds = useMemo(
    () => calculateBounds(JSON.parse(map.geoJson)),
    [map.geoJson]
  );

  const center = useMemo(() => {
    if (!bounds) return [];
    return [
      (bounds[0][0] + bounds[1][0]) / 2 - 0.01,
      (bounds[0][1] + bounds[2][1]) / 2
    ];
  }, [bounds]);

  const flyToCenter = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (map && center.length > 0) {
      map.flyTo({ center, zoom: 14 });
    }
  }, [mapRef, center]);

  useEffect(() => {
    const timeout = setTimeout(flyToCenter, 100);
    return () => clearTimeout(timeout);
  }, [flyToCenter]);

  return { bounds, flyToCenter };
}
