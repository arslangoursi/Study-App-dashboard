import Select from "@/components/Select";
import useLanguage from "@/hooks/useLanguage";

export default function FilterLogsPopup({ onClose }: { onClose: () => void }) {
  const [lang] = useLanguage();

  return (
    <>
      <form className="add__user__experience__popup">
        <div className="add__user__experience__warper">
          <div className="popup__header">
            <button
              type="button"
              onClick={onClose}
              className="popup__close__user"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="add__user__experience__popup__heading">
              {lang === "ar" ? "تصفية السجلات" : "Filter Logs"}
            </div>
          </div>
          <div className="popup__entry__container">
            <div className="create__user__section__row">
              <Select
                label={lang === "ar" ? "مستخدم" : "User"}
                options={[
                  { value: "mehfoozurrehman", label: "MEHFOOZ_UR_REHMAN" },
                  { value: "otherUser", label: "OTHER_USER" }
                ]}
                placeholder=""
              />
            </div>
            <div className="create__user__section__row">
              <Select
                label={lang === "ar" ? "إجراء" : "Action"}
                options={[
                  { value: "update", label: "UPDATE" },
                  { value: "create", label: "CREATE" }
                ]}
                placeholder=""
              />
            </div>
          </div>
          <div className="create__user__form__btn">
            <button
              type="button"
              onClick={onClose}
              className="create__user__form__navigation__button"
            >
              {lang === "ar" ? "تصفية" : "Filter"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
