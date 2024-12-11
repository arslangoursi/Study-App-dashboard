import { IPopup } from "@/interfaces";
import Input from "@/components/Input";
import InputFile from "@/components/InputFile";
import Popup from "@/components/Popup";
import TextArea from "@/components/TextArea";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

const initialDataStatic = {
  id: null as string | null,
  title: "",
  description: "",
  files: [] as File[] | string[],
  startedAt: "",
  expectedAt: "",
  isDone: false
};

export default function DevelopmentPopup({
  onClose,
  onSubmit,
  isEdit = false,
  initialData = initialDataStatic
}: IPopup<typeof initialDataStatic>) {
  const [lang] = useLanguage();
  const [data, setData] = useState(initialData);

  const { title, description, files, startedAt, expectedAt } = data;

  const onDiscard = () => {
    setData(initialData);
    onClose();
  };

  return (
    <Popup
      title={lang === "ar" ? "إنشاء تطوير" : "Create Development"}
      onSubmit={async () => await onSubmit({ data, isEdit })}
      onDiscard={onDiscard}
      onClose={onClose}
    >
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "العنوان" : "Title"}
          id="title"
          value={title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          type="date"
          label={lang === "ar" ? "تاريخ البدء" : "Start Date"}
          id="startDate"
          value={startedAt}
          onChange={(e) => setData({ ...data, startedAt: e.target.value })}
        />
        <Input
          type="date"
          label={lang === "ar" ? "التاريخ المتوقع" : "Expected Date"}
          id="expected_date"
          value={expectedAt}
          onChange={(e) => setData({ ...data, expectedAt: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <TextArea
          type="textarea"
          id="description"
          label={lang === "ar" ? "وصف" : "Description"}
          value={description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <InputFile
          label={lang === "ar" ? "ملفات" : "Files"}
          value={files}
          multiple={true}
          onChange={(e) => setData({ ...data, files: e })}
        />
      </div>
    </Popup>
  );
}
