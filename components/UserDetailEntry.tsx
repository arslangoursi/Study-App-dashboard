import { JSX } from "react";

export default function UserDetailEntry({
  heading,
  text
}: {
  heading: string;
  text: string | number | JSX.Element | null | undefined;
}) {
  return (
    <div className="dashboard__user__bottom__left__entry">
      <div className="dashboard__user__bottom__left__entry__left">
        {heading.replace(/([A-Z])/g, " $1")}
      </div>
      <div className="dashboard__user__bottom__left__entry__right">{text}</div>
    </div>
  );
}
