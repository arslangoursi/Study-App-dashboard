"use client";

import Popup from "@/components/Popup";
import TextArea from "@/components/TextArea";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";
import { createPortal } from "react-dom";
import StillUploaderEntry from "./StillUploaderEntry";

export default function StillsUploader({
  stills,
  onChange
}: {
  stills: Array<{
    day: string | null;
    night: string | null;
  }>;
  onChange: (e: any) => void;
}) {
  const [lang] = useLanguage();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState<{
    day: string | null;
    night: string | null;
  }>({
    day: null,
    night: null
  });

  return (
    <div className="create__user__section__stills">
      {isPopupOpen &&
        createPortal(
          <Popup
            title={lang === "ar" ? "" : "Image Code"}
            onSubmit={() => {
              if (!popupData.day || !popupData.day.includes("<svg"))
                throw new Error(
                  lang === "ar" ? "الرمز غير صحيح" : "Invalid code"
                );

              onChange([...stills, popupData]);
              setIsPopupOpen(false);
            }}
            onClose={() => setIsPopupOpen(false)}
          >
            <TextArea
              // spell-checker: disable
              label={lang === "ar" ? "أدخل رمز الصورة" : "Enter Day Image Code"}
              // spell-checker: enable
              value={popupData.day || ""}
              onChange={(e) =>
                setPopupData({ ...popupData, day: e.target.value })
              }
            />
            <TextArea
              // spell-checker: disable
              label={
                lang === "ar" ? "أدخل رمز الصورة" : "Enter Night Image Code"
              }
              // spell-checker: enable
              value={popupData.night || ""}
              onChange={(e) =>
                setPopupData({ ...popupData, night: e.target.value })
              }
            />
          </Popup>,
          document.body
        )}
      <div className="create__user__section__stills__header">
        <div className="create__user__section__stills__header__name">
          Stills
        </div>
        <button
          type="button"
          onClick={() => {
            setIsPopupOpen(true);
            setPopupData({ day: null, night: null });
          }}
          className="create__user__section__stills__header__button"
        >
          Add Still
        </button>
      </div>
      <div className="create__user__section__stills__images">
        {stills.map(({ day, night }, index) => (
          <StillUploaderEntry
            key={index}
            day={day}
            night={night}
            onChange={(e) =>
              onChange(stills.map((s, i) => (i === index ? { ...s, ...e } : s)))
            }
            onRemove={() => onChange(stills.filter((_, i) => i !== index))}
          />
        ))}
      </div>
    </div>
  );
}
