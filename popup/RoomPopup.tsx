import { IPopup } from "@/interfaces";
import Input from "@/components/Input";
import InputFile from "@/components/InputFile";
import Popup from "@/components/Popup";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

const initialDataStatic = {
  id: null as string | null,
  name: {
    ar: "",
    en: ""
  },
  link360: "",
  files: [] as string[]
};

export default function RoomPopup({
  onClose,
  onSubmit,
  isEdit = false,
  initialData = initialDataStatic
}: IPopup<typeof initialDataStatic>) {
  const [lang] = useLanguage();
  const [data, setData] = useState(initialData);

  const { name, files, link360 } = data;

  const onDiscard = () => {
    setData(initialData);
    onClose();
  };

  return (
    <Popup
      title={lang === "ar" ? "إنشاء غرفة" : "Create Room"}
      onSubmit={async () => await onSubmit({ data, isEdit })}
      onDiscard={onDiscard}
      onClose={onClose}
    >
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "الاسم" : "Name"}
          id="name"
          value={name.en}
          onChange={(e) =>
            setData({ ...data, name: { ...name, en: e.target.value } })
          }
        />
        <Input
          label={lang === "ar" ? "الاسم (بالعربي)" : "Name (Arabic)"}
          id="name"
          value={name.ar}
          onChange={(e) =>
            setData({ ...data, name: { ...name, ar: e.target.value } })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "رابط 360" : "360 link"}
          id="link360"
          value={link360}
          onChange={(e) => setData({ ...data, link360: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <InputFile
          label={lang === "ar" ? "ملفات" : "Files"}
          value={files}
          multiple={true}
          accept="image/*"
          onChange={(e) => setData({ ...data, files: e })}
        />
      </div>
    </Popup>
  );
}
