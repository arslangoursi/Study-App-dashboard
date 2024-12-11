import { GEOJSON } from "@/interfaces";

const flattenCoordinates = (coordinates: any[]) => {
  return coordinates.flat().map((point) => {
    if (Array.isArray(point)) {
      return point.slice(0, 2);
    }
    return point;
  });
};

const calculateCenter = (coordinates: any[][]) => {
  const flattenedCoords = flattenCoordinates(coordinates);

  const x = flattenedCoords.map((point) => point[0]);
  const y = flattenedCoords.map((point) => point[1]);

  const minX = Math.min(...x);
  const maxX = Math.max(...x);
  const minY = Math.min(...y);
  const maxY = Math.max(...y);

  return [(minX + maxX) / 2, (minY + maxY) / 2];
};

const createLabelLayerGeoJson = (data: GEOJSON) => {
  const features = data.features.map((feature) => {
    const center = calculateCenter(feature.geometry.coordinates);
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: center
      },
      properties: {
        name: feature.properties.name
      }
    };
  });

  return {
    type: "FeatureCollection",
    features
  };
};

const calculateBounds = (data: {
  features: { geometry: { coordinates: any[][] } }[];
}) => {
  if (!data || !data.features) {
    return null;
  }
  const allCoordinates = data.features
    .map((feature) => flattenCoordinates(feature.geometry.coordinates))
    .flat()
    .filter(
      (point) =>
        Array.isArray(point) &&
        point.length === 2 &&
        point.every((val) => typeof val === "number")
    );

  const x = allCoordinates.map((point) => point[0]);
  const y = allCoordinates.map((point) => point[1]);

  if (x.length === 0 || y.length === 0) {
    return null;
  }

  const minX = Math.min(...x);
  const maxX = Math.max(...x);
  const minY = Math.min(...y);
  const maxY = Math.max(...y);

  return [
    [maxX, minY],
    [maxX, maxY],
    [minX, maxY],
    [minX, minY]
  ];
};
export { calculateCenter, createLabelLayerGeoJson, calculateBounds };
