import LandClient from "@/components/LandClient";
import { GEOJSON } from "@/interfaces";
import MapActions from "@/components/MapActions";
import MapCart from "@/components/MapCart";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyDetailsClient2d from "@/components/PropertyDetailsClient2d";
import axios from "axios";
import colors from "@/data/mapColors.json";
import normalizeValue from "@/utils/normalizeValue";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export default async function Land({
  projectNumber,
  mapNumber,
  property
}: {
  projectNumber: string;
  mapNumber: string;
  property: string;
}) {
  const mapDetails = await prisma.map.findFirst({
    where: {
      number: mapNumber,
      project: { number: projectNumber }
    },
    select: {
      geoJson: true,
      backgroundImage: true,
      lands: {
        select: {
          id: true,
          plot: true,
          block: true,
          area: true,
          images: true,
          owners: {
            take: 1,
            orderBy: { createdAt: "desc" },
            select: { status: true, unitPrice: true }
          }
        }
      },
      applications: {
        where: {
          status: { in: ["PURCHASED", "ON_HOLD", "NEW"] }
        },
        select: {
          status: true,
          reservedTill: true,
          applicationSelected: {
            select: { propertyId: true }
          }
        }
      }
    }
  });

  if (!mapDetails) return notFound();

  const geoJson = (await axios.get(mapDetails.geoJson as string))
    .data as GEOJSON;

  const getPropertyIdsByStatus = (status: string) =>
    new Set(
      mapDetails.applications
        .filter((app) => app.status === status)
        .flatMap((app) => app.applicationSelected.map((sel) => sel.propertyId))
    );

  const reservedProperties = new Set(
    mapDetails.applications
      .filter(
        (app) =>
          app.status === "NEW" && dayjs(app.reservedTill).isAfter(dayjs())
      )
      .flatMap((app) =>
        app.applicationSelected.map(({ propertyId }) => propertyId)
      )
  );

  const soldProperties = getPropertyIdsByStatus("PURCHASED");
  const onHoldProperties = getPropertyIdsByStatus("ON_HOLD");

  const lands = mapDetails.lands.map((land) => {
    const { id, plot, block, area, images, owners } = land;
    const owner = owners[0];
    const isSold = soldProperties.has(id);
    const isOnHold = onHoldProperties.has(id);
    const isReserved = reservedProperties.has(id);

    const status =
      owner?.status === "AVAILABLE"
        ? "AVAILABLE"
        : isSold
          ? "SOLD"
          : isOnHold || isReserved
            ? "ON_HOLD"
            : "NOT_SELLABLE";

    return {
      id,
      plot: normalizeValue(plot),
      status,
      details: {
        entity: plot,
        batch: block,
        area: area?.toString() || null,
        unitPrice: owner?.unitPrice || 0,
        images
      }
    };
  });

  const geoJsonWithRespectToStatus = {
    ...geoJson,
    features: geoJson.features.map((feature) => {
      const plotName = normalizeValue(feature.properties?.name);
      const land = lands.find((land) => land.plot === plotName);

      if (!land) return feature;

      const color =
        colors[land.status as keyof typeof colors] || colors.NO_DETAILS;

      return {
        ...feature,
        properties: {
          ...feature.properties,
          fill: color,
          stroke: color,
          description: {
            ...feature.properties.description,
            value: `status: ${land.status}, plot_id: ${land.id}, plot_number: ${land.details.entity}, block: ${land.details.batch}, area: ${land.details.area}, unit_price: ${land.details.unitPrice}`
          }
        }
      };
    })
  };

  const selectedLand = lands.find((land) => land.id === property);
  const propertyDetails = selectedLand
    ? {
        id: selectedLand.id,
        entity: selectedLand.details.entity,
        batch: selectedLand.details.batch,
        area: selectedLand.details.area,
        unitPrice: selectedLand.details.unitPrice,
        images: selectedLand.details.images
      }
    : null;

  return (
    <>
      <LandClient
        map={{
          lands,
          geoJson: JSON.stringify(geoJsonWithRespectToStatus)
        }}
      />
      <MapCart />
      <MapActions />
      {propertyDetails && (
        <PropertyDetails data={propertyDetails}>
          <PropertyDetailsClient2d />
        </PropertyDetails>
      )}
    </>
  );
}
