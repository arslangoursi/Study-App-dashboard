import "@/styles/user.scss";

import { IPopup } from "@/interfaces";
import Popup from "@/components/Popup";
import TextArea from "@/components/TextArea";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

const initialDataStatic = { reason: "" };

export default function ApplicationCancelPopup({
  onClose,
  initialData = initialDataStatic,
  onSubmit
}: IPopup<typeof initialDataStatic> & {
  onSubmit: (reason: string) => void;
}) {
  const [lang] = useLanguage();
  const [data, setData] = useState(initialData);

  const { reason } = data;

  const onDiscard = () => {
    onClose();
  };

  return (
    <Popup
      title={lang === "ar" ? "اكتب السبب" : "Cancel Application Reason"}
      onSubmit={() => onSubmit(reason)}
      onClose={onClose}
      onDiscard={onDiscard}
    >
      <div className="create__user__section__row">
        <TextArea
          type="textarea"
          id="reason"
          label={lang === "ar" ? "سبب" : "Reason"}
          value={reason}
          onChange={(e) =>
            setData({
              ...data,
              reason: e.target.value
            })
          }
        />
      </div>
    </Popup>
  );
}
