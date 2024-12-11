import { IPopup } from "@/interfaces";
import Input from "@/components/Input";
import PictureInput from "@/components/PictureInput";
import Popup from "@/components/Popup";
import Select from "@/components/Select";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

const initialProfileData = {
  name: "",
  email: "",
  phone: "",
  department: "",
  workPhone: "",
  workEmail: "",
  workAddress: "",
  bankAccount: "",
  dateOfBirth: "",
  status: "",
  picture: null as File | null | string
};

export default function ProfilePopup({
  onClose,
  onSubmit,
  isEdit = false,
  initialData = initialProfileData
}: IPopup<typeof initialProfileData>) {
  const [lang] = useLanguage();
  const [data, setData] = useState(initialData);

  const {
    picture,
    name,
    email,
    phone,
    department,
    workPhone,
    workEmail,
    workAddress,
    bankAccount,
    dateOfBirth,
    status
  } = data;

  const onDiscard = () => {
    setData(initialData);
    onClose();
  };

  return (
    <Popup
      title={lang === "ar" ? "الملف الشخصي" : "Profile"}
      onSubmit={async () => await onSubmit({ data, isEdit })}
      onDiscard={onDiscard}
      onClose={onClose}
    >
      <div
        className="create__user__section__row"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20
        }}
      >
        <PictureInput
          label={
            picture
              ? lang === "ar"
                ? "صورة"
                : "Picture"
              : lang === "ar"
                ? "إضافة صورة"
                : "Add Picture"
          }
          value={picture}
          onChange={(picture) => setData({ ...data, picture })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "الاسم" : "Name"}
          id="name"
          value={name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <Input
          label={lang === "ar" ? "البريد الإلكتروني" : "Email"}
          id="email"
          value={email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "الهاتف" : "Phone"}
          id="phone"
          value={phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
        <Input
          label={lang === "ar" ? "هاتف العمل" : "Work Phone"}
          id="workPhone"
          value={workPhone}
          onChange={(e) => setData({ ...data, workPhone: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Select
          label={lang === "ar" ? "الحالة" : "Status"}
          options={[
            { value: "ACTIVE", label: lang === "ar" ? "نشط" : "Active" },
            {
              value: "INACTIVE",
              label: lang === "ar" ? "غير نشط" : "Inactive"
            }
          ]}
          value={{
            value: status,
            label:
              status === "ACTIVE"
                ? lang === "ar"
                  ? "نشط"
                  : "Active"
                : lang === "ar"
                  ? "غير نشط"
                  : "Inactive"
          }}
          onChange={(e) => setData({ ...data, status: e.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "القسم" : "Department"}
          id="department"
          value={department}
          onChange={(e) => setData({ ...data, department: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "بريد العمل الإلكتروني" : "Work Email"}
          id="workEmail"
          value={workEmail}
          onChange={(e) => setData({ ...data, workEmail: e.target.value })}
        />
        <Input
          label={lang === "ar" ? "عنوان العمل" : "Work Address"}
          id="workAddress"
          value={workAddress}
          onChange={(e) => setData({ ...data, workAddress: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "حساب البنك" : "Bank Account"}
          id="bankAccount"
          value={bankAccount}
          onChange={(e) => setData({ ...data, bankAccount: e.target.value })}
        />
        <Input
          type="date"
          label={lang === "ar" ? "تاريخ الميلاد" : "Date Of Birth"}
          id="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => setData({ ...data, dateOfBirth: e.target.value })}
        />
      </div>
    </Popup>
  );
}
