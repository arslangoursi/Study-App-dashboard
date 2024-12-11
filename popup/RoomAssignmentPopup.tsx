import { IPopup } from "@/interfaces";
import Popup from "@/components/Popup";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";
import useTable from "@/hooks/useTable";
import { useParams } from "next/navigation";
import ListingTable from "@/components/ListingTable";
import headerItems from "@/data/headerItems.json";
import SearchInput from "@/components/SearchInput";
import ListingTabs from "@/components/ListingTabs";
import useGenerateTabs from "@/hooks/useGenerateTabs";
import ListingCheckbox from "@/components/ListingCheckbox";
import ListingStatus from "@/components/ListingStatus";

export default function RoomAssignmentPopup({
  onClose,
  onSubmit,
  initialData,
  isEdit = false
}: IPopup<{
  roomId: string | null;
  apartmentIds: string[];
}>) {
  const [lang] = useLanguage();
  const { projectId } = useParams();

  const { roomId: roomId, apartmentIds: initialApartmentIds } = initialData || {
    roomId: null,
    apartmentIds: []
  };

  const [selectedRows, setSelectedRows] = useState(initialApartmentIds);

  const onDiscard = () => {
    onClose();
  };

  const [selectedTab, setSelectedTab] = useState("all");

  const { data, isLoading, search, setSearch } = useTable<{
    id: string;
    map: {
      en: string;
      ar: string;
    };
    floor: string;
    unit: string;
    status: string;
  }>({
    searchKey: "apartmentSearch",
    path: `/api/projects/${projectId}/rooms/assign`
  });

  const tabs = useGenerateTabs(data, ["Assigned", "Unassigned"]);

  const filteredData = data.filter((item) => {
    if (selectedTab === "all") {
      return true;
    }

    return item.status.toLowerCase() === selectedTab.toLowerCase();
  });

  return (
    <Popup
      isLarge
      title={lang === "ar" ? "تعيين غرفة" : "Assign Room"}
      onSubmit={async () =>
        await onSubmit({
          data: { roomId, apartmentIds: selectedRows },
          isEdit
        })
      }
      onDiscard={onDiscard}
      onClose={onClose}
      customBody={true}
    >
      <div
        style={{
          height: 700,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "1em",
          backgroundColor: "var(--white)",
          padding: "1em 0"
        }}
      >
        <div
          className="listing__page__header"
          style={{
            padding: "0 1em"
          }}
        >
          <ListingTabs
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <div className="listing__page__header__actions">
            <SearchInput value={search} onChange={setSearch} />
          </div>
        </div>
        <ListingTable
          headerItems={headerItems.projectRoomsAssign}
          actions={[]}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          isFetchingData={isLoading}
          data={filteredData}
          style={{
            height: "calc(100% - 50px)"
          }}
        >
          {filteredData.map((item) => (
            <div className="listing__page__table__content__row" key={item.id}>
              <div className="listing__page__table__content__row__entry checkbox">
                <ListingCheckbox
                  checked={selectedRows.includes(item.id)}
                  onClick={() => {
                    if (selectedRows.includes(item.id)) {
                      setSelectedRows(
                        selectedRows.filter((row) => row !== item.id)
                      );
                    } else {
                      setSelectedRows([...selectedRows, item.id]);
                    }
                  }}
                />
              </div>
              <div className="listing__page__table__content__row__entry">
                {lang === "ar" ? item.map.ar : item.map.en}
              </div>
              <div className="listing__page__table__content__row__entry">
                {item.floor}
              </div>
              <div className="listing__page__table__content__row__entry">
                {item.unit}
              </div>
              <ListingStatus value={item.status} />
            </div>
          ))}
        </ListingTable>
      </div>
    </Popup>
  );
}
