import { useEffect, useState } from "react";

import { IPopup } from "@/interfaces";
import Input from "@/components/Input";
import Popup from "@/components/Popup";
import TextArea from "@/components/TextArea";
import useLanguage from "@/hooks/useLanguage";

const initialDataStatic = {
  id: null as string | null,
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  stillWorking: false
};

export default function ExperiencePopup({
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
    company,
    description,
    endDate,
    location,
    startDate,
    title,
    stillWorking
  } = data;

  const onDiscard = () => {
    setData(initialData);
    onClose();
  };

  return (
    <Popup
      title={
        isEdit
          ? lang === "ar"
            ? "تعديل الخبرة"
            : "Edit Experience"
          : lang === "ar"
            ? "إضافة خبرة"
            : "Add Experience"
      }
      onSubmit={async () => await onSubmit({ data, isEdit })}
      onDiscard={onDiscard}
      onClose={onClose}
    >
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "المسمى الوظيفي" : "Job Title"}
          id="title"
          value={title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "إضافة اسم الشركة" : "Add Company Name"}
          id="company"
          value={company}
          onChange={(e) => setData({ ...data, company: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "الموقع" : "Location"}
          id="location"
          value={location}
          onChange={(e) => setData({ ...data, location: e.target.value })}
        />
      </div>

      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "تاريخ البدء" : "Start Date"}
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setData({ ...data, startDate: e.target.value })}
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
          <span className="checkbox__add__working">
            {lang === "ar" ? "ما زلت أعمل" : "Still Working"}
          </span>
        </label>
      </div>

      {stillWorking ? null : (
        <div className="create__user__section__row">
          <Input
            label={lang === "ar" ? "تاريخ الانتهاء" : "End Date"}
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
          id="description"
          label={lang === "ar" ? "وصف الوظيفة" : "Job Description"}
          value={description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </div>
    </Popup>
  );
}
