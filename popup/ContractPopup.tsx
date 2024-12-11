import { IPopup } from "@/interfaces";
import Input from "@/components/Input";
import Popup from "@/components/Popup";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

const initialDataStatic = {
  salary: "",
  wage: "",
  transportAllowance: "",
  houseAllowance: "",
  otherAllowance: "",
  otherDeduction: "",
  startDate: "",
  endDate: ""
};

export default function ContractPopup({
  onClose,
  onSubmit,
  isEdit = false,
  initialData = initialDataStatic
}: IPopup<typeof initialDataStatic>) {
  const [lang] = useLanguage();
  const [data, setData] = useState(initialData);

  const {
    salary,
    wage,
    transportAllowance,
    houseAllowance,
    otherAllowance,
    otherDeduction,
    startDate,
    endDate
  } = data;

  const onDiscard = () => {
    setData(initialData);
    onClose();
  };

  return (
    <Popup
      title={lang === "ar" ? "تعديل العقد" : "Edit Contract"}
      onSubmit={async () => await onSubmit({ data, isEdit })}
      onDiscard={onDiscard}
      onClose={onClose}
    >
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "راتب" : "Salary"}
          id="fullName"
          value={salary}
          onChange={(e) => setData({ ...data, salary: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "تاريخ البدء" : "Start Date"}
          id="startDate"
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
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "تاريخ الانتهاء" : "End Date"}
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) =>
            setData({
              ...data,
              endDate: e.target.value
            })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "أجر" : "Wage"}
          id="wage"
          value={wage}
          onChange={(e) =>
            setData({
              ...data,
              wage: e.target.value
            })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "بدل السكن" : "House Allowance"}
          id="allowance"
          value={houseAllowance}
          onChange={(e) =>
            setData({
              ...data,
              houseAllowance: e.target.value
            })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "بدل السكن" : "House Allowance"}
          id="allowance"
          value={transportAllowance}
          onChange={(e) =>
            setData({
              ...data,
              transportAllowance: e.target.value
            })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "بدل السكن" : "House Allowance"}
          id="allowance"
          value={otherAllowance}
          onChange={(e) =>
            setData({
              ...data,
              otherAllowance: e.target.value
            })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "بدل السكن" : "House Allowance"}
          id="allowance"
          value={otherDeduction}
          onChange={(e) =>
            setData({
              ...data,
              otherDeduction: e.target.value
            })
          }
        />
      </div>
    </Popup>
  );
}
