import "@/styles/user.scss";

import { IPopup } from "@/interfaces";
import Popup from "@/components/Popup";
import TextArea from "@/components/TextArea";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

const initialDataStatic = { reason: "" };

export default function ReasonPopup({
  onClose,
  onSubmit,
  initialData = initialDataStatic
}: IPopup<typeof initialDataStatic>) {
  const [lang] = useLanguage();
  const [data, setData] = useState(initialData);

  const onDiscard = () => {
    onClose();
  };

  const { reason } = data;

  return (
    <Popup
      title={lang === "ar" ? "اكتب السبب" : "Write Reason"}
      onSubmit={async () =>
        onSubmit({
          data: { reason },
          isEdit: false
        })
      }
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
