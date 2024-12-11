import "@/styles/user.scss";

import DeleteIcon from "@/icons/DeleteIcon";
import { IPopup } from "@/interfaces";
import Popup from "@/components/Popup";
import useLanguage from "@/hooks/useLanguage";

const initialDataStatic = {};

export default function CustomerPopup({
  onClose,
  onSubmit
}: IPopup<typeof initialDataStatic>) {
  const [lang] = useLanguage();
  const onDiscard = () => {
    onClose();
  };

  return (
    <Popup
      title={lang === "ar" ? "حذف" : "Delete"}
      onSubmit={async () => await onSubmit({ data: {}, isEdit: false })}
      onDiscard={onDiscard}
      onClose={onClose}
    >
      <div className="delete__popup__warper">
        <div className="delete__popup__svg__text">
          {lang === "ar"
            ? "هل أنت متأكد أنك تريد حذف هذا؟"
            : "Are you sure you want to delete this?"}
        </div>
        <div className="delete__popup__svg__warper">
          <DeleteIcon />
        </div>
      </div>
    </Popup>
  );
}
