export default function RightBoxMnuWrapperAdd({
  onAdd,
  title,
  info,
  buttonTitle
}: {
  onAdd: () => void;
  title: string;
  info: string;
  buttonTitle: string;
}) {
  return (
    <div className="dashboard__user__bottom__right__box__add">
      <div className="dashboard__user__bottom__left__heading">{title}</div>
      <div className="dashboard__user__bottom__left__text">{info}</div>
      <button
        type="button"
        onClick={onAdd}
        className="dashboard__user__bottom__left__btn"
      >
        {buttonTitle}
      </button>
    </div>
  );
}
