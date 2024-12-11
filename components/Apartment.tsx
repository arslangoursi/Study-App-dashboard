import ApartmentSelection from "@/components/ApartmentSelection";
import normalizeValue from "@/utils/normalizeValue";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { mapView3d } from "@/constants/constants";
import Map3dMultiView from "@/components/ApartmentMultiView";
import ApartmentSvgUi from "@/components/ApartmentSvgUi";
import ApartmentModelClient from "./ApartmentModelClient";
import dayjs from "dayjs";

export default async function Apartment({
  projectNumber,
  mapNumber
}: {
  projectNumber: string;
  mapNumber: string;
}) {
  const mapDetailsPromise = prisma.map.findFirst({
    where: {
      number: mapNumber,
      project: { number: projectNumber }
    },
    select: {
      latitude: true,
      longitude: true,
      model: true,
      apartments: {
        select: {
          id: true,
          tower: true,
          floor: true,
          unit: true,
          images: true,
          area: true,
          numberOfBedrooms: true,
          asset3d: {
            select: { files: true, link360: true }
          },
          owners: {
            take: 1,
            orderBy: { createdAt: "desc" },
            select: { status: true, unitPrice: true }
          }
        }
      },
      applications: {
        where: { status: { in: ["PURCHASED", "ON_HOLD", "NEW"] } },
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

  const stillsPromise = prisma.map
    .findFirst({
      where: { number: mapNumber, project: { number: projectNumber } },
      select: { dayStills: true, nightStills: true }
    })
    .then(
      (res) =>
        res?.dayStills.map((dayStill, index) => ({
          day: dayStill,
          night: res.nightStills[index]
        })) || []
    );

  const [mapDetails, stills] = await Promise.all([
    mapDetailsPromise,
    stillsPromise
  ]);

  if (!mapDetails) return notFound();

  const getPropertyIdsByStatus = (status: string) =>
    new Set(
      mapDetails.applications
        .filter((app) => app.status === status)
        .flatMap((app) =>
          app.applicationSelected.map(({ propertyId }) => propertyId)
        )
    );

  const reservedProperties = new Set(
    mapDetails.applications
      .filter(
        ({ status, reservedTill }) =>
          status === "NEW" && dayjs(reservedTill).isAfter(dayjs())
      )
      .flatMap(({ applicationSelected }) =>
        applicationSelected.map(({ propertyId }) => propertyId)
      )
  );

  const soldProperties = getPropertyIdsByStatus("PURCHASED");
  const onHoldProperties = getPropertyIdsByStatus("ON_HOLD");

  const apartments = mapDetails.apartments.map((apartment) => {
    const isSold = soldProperties.has(apartment.id);
    const isOnHold = onHoldProperties.has(apartment.id);
    const isReserved = reservedProperties.has(apartment.id);
    const status =
      apartment.owners[0]?.status === "AVAILABLE"
        ? "AVAILABLE"
        : isSold
          ? "SOLD"
          : isOnHold || isReserved
            ? "ON_HOLD"
            : "NOT_SELLABLE";

    return {
      id: apartment.id,
      unit: `${apartment.floor}-${normalizeValue(apartment.unit)}`,
      status,
      details: {
        batch: apartment.floor,
        entity: apartment.unit,
        area: apartment.area?.toString() || null,
        unitPrice: apartment.owners[0]?.unitPrice,
        images: apartment.images,
        numberOfBedrooms: apartment.numberOfBedrooms,
        tower: apartment.tower,
        asset3dFiles: apartment.asset3d?.files || [],
        link360: apartment.asset3d?.link360 || ""
      }
    };
  });

  return (
    <>
      {mapView3d ? (
        <Map3dMultiView
          modelView={
            <ApartmentModelClient
              apartments={apartments}
              latitude={mapDetails.latitude}
              longitude={mapDetails.longitude}
              model={mapDetails.model}
            />
          }
          stillView={<ApartmentSvgUi apartments={apartments} stills={stills} />}
        />
      ) : (
        <ApartmentSelection apartments={apartments} />
      )}
    </>
  );
}
