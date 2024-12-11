import { IPopup } from "@/interfaces";
import Input from "@/components/Input";
import PictureInput from "@/components/PictureInput";
import Popup from "@/components/Popup";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

const initialDataStatic = {
  picture: "" as string | File | null,
  name: "",
  address: "",
  city: "",
  country: "",
  zipCode: "",
  companyName: "",
  language: "",
  website: "",
  taxNumber: "",
  nationality: ""
};

export default function CustomerPopup({
  onClose,
  onSubmit,
  isEdit = false,
  initialData = initialDataStatic
}: IPopup<typeof initialDataStatic>) {
  const [lang] = useLanguage();
  const [data, setData] = useState(initialData);

  const {
    picture,
    name,
    address,
    city,
    country,
    zipCode,
    companyName,
    language,
    website,
    taxNumber,
    nationality
  } = data;

  const onDiscard = () => {
    setData(initialData);
    onClose();
  };

  return (
    <Popup
      title={`${
        isEdit
          ? language === "ar"
            ? "تعديل"
            : "Edit"
          : lang === "ar"
            ? "إضافة"
            : "Add"
      } Customer Details`}
      onSubmit={async () => await onSubmit({ data, isEdit })}
      onDiscard={onDiscard}
      onClose={onClose}
    >
      <div
        className="create__user__section__row"
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div className="create__user__section__image__edit">
          <PictureInput
            label={lang === "ar" ? "تحميل الصورة" : "Upload picture"}
            value={picture}
            onChange={(file) => setData({ ...data, picture: file })}
          />
          <div
            className="create__user__section__image__label"
            style={{ marginBottom: "1em" }}
          >
            {lang === "ar"
              ? "مسموح *.jpeg، *.jpg، *.png، *.gif الحد الأقصى للحجم 10 ميغابايت"
              : "Allowed *.jpeg, *.jpg, *.png, *.gif Max size of 10 MB"}
          </div>
        </div>
      </div>
      <div className="create__user__section__row">
        <Input
          label={language === "ar" ? "تعديل الاسم" : "Edit Name"}
          id="name"
          value={name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <Input
          label={lang === "ar" ? "تعديل العنوان" : "Edit Address"}
          id="address"
          value={address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "مدينة" : "City"}
          id="city"
          value={city}
          onChange={(e) => setData({ ...data, city: e.target.value })}
        />
        <Input
          label={lang === "ar" ? "بلد" : "Country"}
          id="country"
          value={country}
          onChange={(e) => setData({ ...data, country: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "الرمز البريدي" : "Zip Code"}
          id="zipCode"
          value={zipCode}
          onChange={(e) => setData({ ...data, zipCode: e.target.value })}
        />
        <Input
          label={lang === "ar" ? "اسم الشركة" : "Company Name"}
          id="companyName"
          value={companyName}
          onChange={(e) => setData({ ...data, companyName: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "اللغة" : "Language"}
          id="language"
          value={language}
          onChange={(e) => setData({ ...data, language: e.target.value })}
        />
        <Input
          label={lang === "ar" ? "موقع إلكتروني" : "Website"}
          id="website"
          value={website}
          onChange={(e) => setData({ ...data, website: e.target.value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "رقم الضريبة" : "Tax Number"}
          id="taxNumber"
          value={taxNumber}
          onChange={(e) => setData({ ...data, taxNumber: e.target.value })}
        />
        <Input
          label={lang === "ar" ? "تعديل الجنسية" : "Edit Nationality"}
          id="nationality"
          value={nationality}
          onChange={(e) => setData({ ...data, nationality: e.target.value })}
        />
      </div>
    </Popup>
  );
}
