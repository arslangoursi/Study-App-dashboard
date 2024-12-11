import { IPopup } from "@/interfaces";
import Input from "@/components/Input";
import Popup from "@/components/Popup";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

const initialDataStatic = {
  id: null as string | null,
  name: "",
  relation: "",
  dateOfBirth: ""
};

export default function FamilyDetailPopup({
  onClose,
  onSubmit,
  isEdit = false,
  initialData = initialDataStatic
}: IPopup<typeof initialDataStatic>) {
  const [lang] = useLanguage();
  const [data, setData] = useState(initialData);

  const { name, relation, dateOfBirth } = data;

  const onDiscard = () => {
    setData(initialData);
    onClose();
  };

  return (
    <Popup
      title={lang === "ar" ? "عائلة" : "Family"}
      onSubmit={async () => await onSubmit({ data, isEdit })}
      onDiscard={onDiscard}
      onClose={onClose}
    >
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "الاسم الكامل" : "Full Name"}
          id="fullName"
          value={name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "علاقة" : "Relation"}
          id="specialization"
          value={relation}
          onChange={(e) =>
            setData({
              ...data,
              relation: e.target.value
            })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "تاريخ الميلاد" : "Date of Birth"}
          id="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(e) =>
            setData({
              ...data,
              dateOfBirth: e.target.value
            })
          }
        />
      </div>
    </Popup>
  );
}
