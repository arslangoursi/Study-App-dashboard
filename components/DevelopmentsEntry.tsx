import CreateDevelopmentPopup from "@/popup/DevelopmentPopup";
import { IDevelopment } from "@/interfaces";
import ListingCheckbox from "@/components/ListingCheckbox";
import ListingDate from "@/components/ListingDate";
import ListingFiles from "@/components/ListingFiles";
import ListingLargeData from "@/components/ListingLargeData";
import ListingStatus from "@/components/ListingStatus";
import axios from "axios";
import dayjs from "dayjs";
import uploadFile from "@/utils/uploadFile";
import useAction from "@/hooks/useAction";
import useLanguage from "@/hooks/useLanguage";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function DevelopmentsEntry({
  item,
  selectedRows,
  setSelectedRows,
  refetch
}: {
  item: IDevelopment;
  selectedRows: string[];
  setSelectedRows: (value: string[]) => void;
  refetch: () => void;
}) {
  const [lang] = useLanguage();
  const { projectId } = useParams();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const [, handleUpdate] = useAction({
    promise: async (value) => {
      const { files, description, expectedAt, startedAt, isDone, title, id } =
        value.data as IDevelopment & {
          id: string;
        };

      const fileUrls = await Promise.all(files.map(uploadFile));

      const data = {
        files: fileUrls,
        description,
        expectedAt: dayjs(expectedAt).toISOString(),
        startedAt: dayjs(startedAt).toISOString(),
        isDone,
        title
      };

      return axios.put(`/api/projects/${projectId}/developments`, {
        id: id,
        ...data
      });
    },
    successMessage:
      lang === "ar"
        ? "تم تحديث المشروع بنجاح"
        : "Development updated successfully",
    mutatePath: `/api/projects/${projectId}/developments`,
    onSuccess: refetch
  });

  return (
    <>
      {isEditPopupOpen && (
        <CreateDevelopmentPopup
          onClose={() => setIsEditPopupOpen(false)}
          onSubmit={handleUpdate}
          initialData={item}
          isEdit
        />
      )}
      <div
        onClick={() => setIsEditPopupOpen(true)}
        className="listing__page__table__content__row"
      >
        <div className="listing__page__table__content__row__entry checkbox">
          <ListingCheckbox
            checked={selectedRows.includes(item.id)}
            onClick={() => {
              if (selectedRows.includes(item.id)) {
                setSelectedRows(selectedRows.filter((row) => row !== item.id));
              } else {
                setSelectedRows([...selectedRows, item.id]);
              }
            }}
          />
        </div>
        <ListingStatus value={item.isDone ? "Completed" : "In Progress"} />
        <div className="listing__page__table__content__row__entry">
          {item.title}
        </div>
        <ListingLargeData value={item.description} />
        <ListingFiles files={item.files} />
        <ListingDate date={item.startedAt} />
        <ListingDate date={item.expectedAt} />
      </div>
    </>
  );
}
