import { IPopup } from "@/interfaces";
import Input from "@/components/Input";
import InputFile from "@/components/InputFile";
import Popup from "@/components/Popup";
import TextArea from "@/components/TextArea";
import { useState } from "react";

const initialDataStatic = {
  title: "",
  description: "",
  reminderAt: "",
  files: null as File[] | null
};

export default function AlertPopup({
  onClose,
  onSubmit,
  isEdit = false,
  initialData = initialDataStatic
}: IPopup<typeof initialDataStatic>) {
  const [data, setData] = useState(initialData);

  const { title, description, reminderAt, files } = data;

  const onDiscard = () => {
    setData(initialData);
    onClose();
  };

  return (
    <Popup
      title="Add Alert"
      onSubmit={async () => await onSubmit({ data, isEdit })}
      onDiscard={onDiscard}
      onClose={onClose}
    >
      <div className="create__user__section__row">
        <Input
          label="Name"
          id="name"
          value={title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <TextArea
          type="textarea"
          id="description"
          label="Description"
          value={description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          type="datetime-local"
          label="Reminder At"
          id="reminderAt"
          value={reminderAt}
          onChange={(e) => setData({ ...data, reminderAt: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <InputFile
          label="Files"
          value={files}
          multiple={true}
          onChange={(e) => setData({ ...data, files: e })}
        />
      </div>
    </Popup>
  );
}
