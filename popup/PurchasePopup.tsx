import "@/styles/user.scss";

import { IPopup } from "@/interfaces";
import Input from "@/components/Input";
import Popup from "@/components/Popup";
import TextArea from "@/components/TextArea";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

const initialDataStatic = {
  number: "",
  amount: "",
  note: ""
};

export default function PurchasePopup({
  onClose,
  initialData = initialDataStatic
}: IPopup<typeof initialDataStatic>) {
  const [lang] = useLanguage();
  const [data, setData] = useState(initialData);
  const onDiscard = () => {
    onClose();
  };

  const { number, amount, note } = data;

  return (
    <Popup
      title={lang === "ar" ? "إنشاء عملية شراء" : "Create Purchase"}
      onSubmit={() => {}}
      onClose={onClose}
      onDiscard={onDiscard}
    >
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "رقم الطلب" : "Application Number"}
          id="number"
          value={number}
          onChange={(e) =>
            setData({
              ...data,
              number: e.target.value
            })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "المبلغ" : "Amount"}
          id="amount"
          value={number}
          onChange={(e) =>
            setData({
              ...data,
              amount: e.target.value
            })
          }
        />
      </div>
      <div className="create__user__section__row">
        <TextArea
          type="textarea"
          id="note"
          label={lang === "ar" ? "ملاحظة الشراء" : "Purchase Note"}
          value={note}
          onChange={(e) =>
            setData({
              ...data,
              note: e.target.value
            })
          }
        />
      </div>
    </Popup>
  );
}
