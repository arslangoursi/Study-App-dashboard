import { useEffect, useState } from "react";

import { IPopup } from "@/interfaces";
import Input from "@/components/Input";
import Popup from "@/components/Popup";
import TextArea from "@/components/TextArea";
import useLanguage from "@/hooks/useLanguage";

const initialDataStatic = {
  id: null as string | null,
  title: "",
  institute: "",
  location: "",
  startDate: "",
  stillWorking: false,
  endDate: null as null | string,
  description: ""
};

export default function QualificationsPopup({
  onClose,
  onSubmit,
  isEdit = false,
  initialData = initialDataStatic
}: IPopup<typeof initialDataStatic>) {
  const [lang] = useLanguage();
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (data.endDate === null) {
      setData({
        ...data,
        stillWorking: true
      });
    } else {
      setData({
        ...data,
        stillWorking: false
      });
    }
  }, [data.endDate]);

  const {
    title,
    institute,
    location,
    startDate,
    stillWorking,
    endDate,
    description
  } = data;

  const onDiscard = () => {
    setData(initialData);
    onClose();
  };

  return (
    <Popup
      title={isEdit ? "Edit Qualifications" : "Add Qualifications"}
      onSubmit={async () => await onSubmit({ data, isEdit })}
      onDiscard={onDiscard}
      onClose={onClose}
    >
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "عنوان" : "Title"}
          id="title"
          type="text"
          value={title}
          onChange={(e) =>
            setData({
              ...data,
              title: e.target.value
            })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "معهد" : "Institute"}
          id="institute"
          type="text"
          value={institute}
          onChange={(e) =>
            setData({
              ...data,
              institute: e.target.value
            })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "موقع" : "Location"}
          id="location"
          type="text"
          value={location}
          onChange={(e) =>
            setData({
              ...data,
              location: e.target.value
            })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "حدد تاريخ البدء" : "Select Start Date"}
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) =>
            setData({
              ...data,
              startDate: e.target.value
            })
          }
        />
      </div>
      <div className="user__checkbox__warper__row">
        <label
          className="user__checkbox__warper"
          style={{
            padding: "10px"
          }}
        >
          <input
            type="checkbox"
            className="checkbox__entry"
            checked={stillWorking}
            onChange={(e) =>
              setData({
                ...data,
                stillWorking: e.target.checked
              })
            }
          />
          <span className="checkbox__add__working">Still Studying</span>
        </label>
      </div>

      {stillWorking ? null : (
        <div className="create__user__section__row">
          <Input
            label={lang === "ar" ? "حدد تاريخ الانتهاء" : "Select End Date"}
            id="end-date"
            type="date"
            value={endDate || ""}
            onChange={(e) =>
              setData({
                ...data,
                endDate: e.target.value
              })
            }
          />
        </div>
      )}
      <div className="create__user__section__row">
        <TextArea
          type="textarea"
          label={lang === "ar" ? "وصف" : "Description"}
          id="qualifications"
          value={description}
          onChange={(e) =>
            setData({
              ...data,
              description: e.target.value
            })
          }
          rows="4"
          cols="30"
        />
      </div>
    </Popup>
  );
}
