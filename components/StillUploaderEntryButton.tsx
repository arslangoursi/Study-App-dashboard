"use client";

import Popup from "@/components/Popup";
import TextArea from "@/components/TextArea";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function StillUploaderEntryButton({
  value,
  onChange
}: {
  value: string | null;
  onChange: (e: any) => void;
}) {
  const [lang] = useLanguage();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupValue, setPopupValue] = useState(value || "");

  return (
    <div className="create__user__section__stills__images__entry__button">
      {isPopupOpen &&
        createPortal(
          <Popup
            title={lang === "ar" ? "رمز الصورة" : "Image Code"}
            onSubmit={() => {
              if (!popupValue.includes("<svg"))
                throw new Error(
                  lang === "ar" ? "الرمز غير صحيح" : "Invalid code"
                );

              onChange(popupValue);
              setIsPopupOpen(false);
            }}
            onClose={() => setIsPopupOpen(false)}
          >
            <TextArea
              label={lang === "ar" ? "أدخل رمز الصورة" : "Enter Image Code"}
              value={popupValue}
              onChange={(e) => setPopupValue(e.target.value)}
            />
          </Popup>,
          document.body
        )}
      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className="create__user__section__stills__images__entry__button__upload"
      />
      {value ? (
        <div
          className="create__user__section__stills__images__entry__button__svg"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ) : (
        <img
          loading="lazy"
          src="https://www.livewithsol.com/wp-content/uploads/2023/01/61312bc3896d1e09e2c5f9cd_location-placeholder-460.jpg"
          alt="Still"
          className="create__user__section__stills__images__entry__button__svg"
        />
      )}
    </div>
  );
}
