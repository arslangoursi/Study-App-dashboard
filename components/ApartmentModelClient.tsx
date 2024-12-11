"use client";

import {
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Object3D
} from "three";
import colorJs from "color";

import Map, { NavigationControl, MapRef } from "react-map-gl";
import {
  Suspense,
  useState,
  useEffect,
  useRef,
  useTransition,
  useCallback,
  useMemo
} from "react";

import Loader from "@/components/Loader";
// @ts-ignore
import { Threebox } from "threebox-plugin";
import dynamic from "next/dynamic";
import { IMap3dApartment } from "@/interfaces";
import mapColors from "@/data/mapColors.json";
import changeMaterialColor from "@/utils/changeMaterialColor";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { apiUrl, pricingMatch } from "@/constants/constants";
import { parseAsBoolean, useQueryState } from "nuqs";
import PortalToApartmentDetails from "./PortalToApartmentDetails";
import PropertyDetails from "./PropertyDetails";
import PropertyDetailsClient3d from "./PropertyDetailsClient3d";
import MapActions from "./MapActions";
import MapCart from "./MapCart";
import MapOverlayViewButton from "./MapOverlayViewButton";
import MapOverlayHighlightToggle from "./MapOverlayHighlightToggle";

const MapOverlayFilters3d = dynamic(
  () => import("@/components/MapOverlayFilters3d"),
  { ssr: false }
);

declare global {
  interface Window {
    tb: any;
  }
}

const getObjectNames = (object: Object3D): string[] => {
  const names: string[] = [];
  while (object) {
    names.push(object.name);
    object = object.parent as Object3D;
  }
  return names;
};
const coordsAdjustment = [0.0005, 0.0015];

const surroundingModels = [] as {
  url: string;
  coordinates: [number, number];
  rotation: { x: number; y: number; z: number };
}[];

export const views = {
  Street: "street",
  Satellite: "satellite"
};

export default function ApartmentModelClient({
  apartments,
  latitude,
  longitude,
  model
}: {
  apartments: IMap3dApartment[];
  latitude: number | null;
  longitude: number | null;
  model: string | null;
}) {
  const modelUrl =
    process.env.NODE_ENV === "production"
      ? model
      : apiUrl + "/models/model.glb";

  const router = useRouter();
  const pathname = usePathname();
  const mapRef = useRef<MapRef | null>(null);
  const [isHighlighted, setHighlighted] = useQueryState(
    "highlighted",
    parseAsBoolean.withDefault(true)
  );
  const [property, setProperty] = useQueryState("property");
  const [isFilterPending, startFilterTransition] = useTransition();
  const searchParams = useSearchParams();
  const selectedView = searchParams.get("mapView") || views.Satellite;
  const [modelInstance, setModelInstance] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(modelInstance === null);
  const [selectionPending, startSelectionTransition] = useTransition();

  const handleMapLoad = useCallback(() => {
    if (!mapRef.current?.getMap()) return;

    const mapContext = mapRef.current.getMap();
    mapContext.flyTo({
      center: [longitude ?? 0, latitude ?? 0],
      zoom: 17,
      pitch: 64.9,
      bearing: 172.5,
      speed: 1.5,
      curve: 1
    });

    if (!modelUrl || modelInstance) {
      setIsLoading(false);
      return;
    }

    try {
      window.tb = new Threebox(
        mapContext,
        mapContext.getCanvas().getContext("webgl"),
        { defaultLights: true }
      );

      window.tb.loadObj(
        {
          obj: modelUrl,
          type: "gltf",
          units: "meters",
          rotation: { x: 90, y: -65, z: 0 }
        },
        (model: Object3D | null) => {
          setModelInstance(model || null);
          if (!model) console.error("Failed to load the model");
        }
      );

      surroundingModels.map((surroundingModel, index) => {
        window.tb.loadObj(
          {
            obj: surroundingModel.url,
            type: "gltf",
            units: "meters",
            rotation: surroundingModel.rotation
          },
          (model: any) => {
            const coordsAfterAdjustment = [
              (surroundingModel.coordinates[1] ?? 0) - coordsAdjustment[0],
              (surroundingModel.coordinates[0] ?? 0) - coordsAdjustment[1]
            ];

            model.setCoords(coordsAfterAdjustment);

            window.tb.add(model);

            const layerId = "custom-threebox-model" + index;

            mapContext.addLayer({
              id: layerId,
              type: "custom",
              renderingMode: "3d",
              render: () => window.tb.update()
            });
          }
        );
      });
    } catch (error) {
      console.error("Error loading model:", error);
      setIsLoading(false);
    }

    return () => {
      window.tb?.clear();
    };
  }, [latitude, longitude, modelInstance, modelUrl, mapRef]);

  const [filters, setFilters] = useState<{
    towers: string[];
    floors: string[];
    bedrooms: string[];
    statuses: string[];
    prices: string[];
    area: number[];
  } | null>(null);

  const test = false;

  const selectableApartments = useMemo(
    () =>
      apartments?.reduce(
        (map, { details, status }) => {
          const {
            numberOfBedrooms,
            unitPrice,
            area: aptArea,
            batch: floor = "",
            tower,
            entity
          } = details;

          if (
            (filters?.towers?.length && !filters.towers.includes(tower)) ||
            (filters?.floors?.length &&
              (!floor || !filters.floors.includes(floor))) ||
            (filters?.bedrooms?.length &&
              !filters.bedrooms.includes(`${numberOfBedrooms} bedroom`)) ||
            (filters?.statuses?.length && !filters.statuses.includes(status)) ||
            (filters?.prices?.length &&
              (unitPrice === null ||
                !pricingMatch(filters.prices, unitPrice))) ||
            (filters?.area?.length &&
              (aptArea === null ||
                parseFloat(aptArea) < filters.area[0] ||
                parseFloat(aptArea) > filters.area[1]))
          ) {
            return map;
          }

          const color = test
            ? mapColors[
                Object.keys(mapColors)[
                  Math.floor(Math.random() * Object.keys(mapColors).length)
                ] as keyof typeof mapColors
              ] || mapColors.NO_DETAILS
            : mapColors[status as keyof typeof mapColors] ||
              mapColors.NO_DETAILS;

          map[entity] = color;

          return map;
        },
        {} as Record<string, string>
      ) || {},
    [apartments, filters]
  );

  useEffect(() => {
    if (!modelInstance || !mapRef.current) return;

    const mapContext = mapRef.current.getMap();
    if (!mapContext) return;

    const coordsAfterAdjustment = [
      (longitude ?? 0) - coordsAdjustment[0],
      (latitude ?? 0) - coordsAdjustment[1]
    ];

    modelInstance.setCoords(coordsAfterAdjustment);
    window.tb.add(modelInstance);

    const layerId = "custom-threebox-model";

    mapContext.addLayer({
      id: layerId,
      type: "custom",
      renderingMode: "3d",
      render: () => window.tb.update()
    });

    setIsLoading(false);
  }, [modelInstance, mapRef, latitude, longitude]);

  useEffect(() => {
    if (!modelInstance) return;

    startFilterTransition(() => {
      modelInstance.traverse((object: any) => {
        const color = getObjectNames(object).reduce<string | null>(
          (acc, name) =>
            acc ||
            selectableApartments[name] ||
            (name.includes("Z-LV") ? "transparent" : null),
          null
        );

        if (color) {
          if (color !== "transparent" && object.isMesh) {
            const outlineMaterial = new LineBasicMaterial({
              color: colorJs(color).lighten(0.5).hex(),
              linewidth: 4
            });

            const edgesGeometry = new EdgesGeometry(object.geometry);
            const outlineMesh = new LineSegments(
              edgesGeometry,
              outlineMaterial
            );
            outlineMesh.userData.isOutline = true;

            object.add(outlineMesh);
            object.material.opacity = 0.2;
            object.material.needsUpdate = true;
          }

          changeMaterialColor(object, color, isHighlighted);
        }
      });
    });

    return () => {
      if (!mapRef.current) return;
      const mapContext = mapRef.current.getMap();
      const { lat: latitude, lng: longitude } = mapContext.getCenter();
      mapContext.flyTo(
        { center: [longitude || 0, latitude || 0], zoom: mapContext.getZoom() },
        { duration: 0 }
      );
    };
  }, [modelInstance, selectableApartments, isHighlighted]);

  const handleMouseDown = useCallback(
    (event: any) => {
      const intersects = window.tb.queryRenderedFeatures(event.point);
      if (!intersects?.length) return;

      const { object } = intersects[0];
      const selectedName = getObjectNames(object).find(
        (name) => selectableApartments[name]
      );

      if (!selectedName) return;

      const apartment = apartments.find(
        ({ details }) => details.entity === selectedName
      );

      if (!apartment) return;

      if (!test) {
        if (apartment.status !== "AVAILABLE") return;
      }

      modelInstance.traverse((obj: any) => {
        if (obj.material?.opacity === 0.5) {
          obj.material.opacity = 0.2;
          obj.material.needsUpdate = true;
        }
      });

      const material = object?.material;
      if (material) {
        material.opacity = 0.5;
        material.needsUpdate = true;
      }

      setTimeout(() => {
        startSelectionTransition(() => {
          setProperty(apartment.id);
        });
      }, 100);
    },
    [
      apartments,
      modelInstance,
      selectableApartments,
      pathname,
      router,
      startSelectionTransition
    ]
  );

  useEffect(() => {
    if (!property || !modelInstance) return;

    const targetApartment = apartments.find(({ id }) => id === property);
    if (!targetApartment) return;

    const targetObjectName = targetApartment.details.entity;
    modelInstance.traverse((object: any) => {
      const objectNames = getObjectNames(object).map((name) =>
        name.toLowerCase().trim()
      );
      const normalizedTargetName = targetObjectName.toLowerCase().trim();

      if (objectNames.includes(normalizedTargetName)) {
        const material = object?.material;
        if (material) {
          material.opacity = 0.5;
          material.needsUpdate = true;
        }
      }
    });
  }, [property, modelInstance, apartments, selectableApartments]);

  const apartment = apartments.find(
    (apartment: { id: string }) => apartment.id === property
  );

  const propertyDetails = {
    id: apartment?.id || "",
    entity: apartment?.details.entity || "",
    batch: apartment?.details.batch || null,
    area: apartment?.details.area || null,
    unitPrice: apartment?.details.unitPrice || 0,
    images: apartment?.details.images || [],
    status: apartment?.status || "NOT_SELLABLE"
  };

  const [, setView] = useQueryState("view");
  const [isPending, startTransition] = useTransition();

  const handleMapClick = () => {
    startTransition(() => {
      setView("still");
    });
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100dvh" }}>
      <button
        type="button"
        onClick={handleMapClick}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 8,
          cursor: "pointer",
          border: "none",
          color: "black",
          gap: 8
        }}
      >
        {isPending ? (
          <Loader small color="currentColor" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        )}
        Back
      </button>
      {!modelInstance && isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 999
          }}
        >
          <Loader />
        </div>
      )}
      {selectionPending && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999
          }}
        >
          <Loader />
        </div>
      )}
      <Map
        reuseMaps
        ref={mapRef}
        antialias={true}
        onLoad={handleMapLoad}
        onMouseDown={handleMouseDown}
        mapStyle={
          selectedView === views.Street
            ? "mapbox://styles/mapbox/streets-v12"
            : "mapbox://styles/mapbox/satellite-streets-v12"
        }
        preserveDrawingBuffer={true}
        interactiveLayerIds={["data"]}
        style={{ width: "100vw", height: "100dvh" }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_API_TOKEN}
      >
        <NavigationControl />
      </Map>
      <Suspense fallback={null}>
        <MapOverlayFilters3d
          apartments={apartments}
          isPending={isFilterPending}
          onApply={setFilters}
        />
      </Suspense>
      <MapCart />
      <MapActions />
      <MapOverlayViewButton />
      <MapOverlayHighlightToggle
        isHighlighted={isHighlighted}
        setHighlighted={setHighlighted}
      />
      {property && (
        <PortalToApartmentDetails>
          <PropertyDetails isApartment data={propertyDetails}>
            <PropertyDetailsClient3d />
          </PropertyDetails>
        </PortalToApartmentDetails>
      )}
    </div>
  );
}
