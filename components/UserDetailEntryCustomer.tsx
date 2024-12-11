export default function UserDetailEntryCustomer({
  heading,
  text
}: {
  heading: string;
  text: string;
}) {
  return (
    <div className="dashboard__user__bottom__left__entry dashboard__user__bottom__left__entry__customer">
      <div className="dashboard__user__bottom__left__entry__left">
        {heading}
      </div>
      <div className="dashboard__user__bottom__left__entry__right">
        {text || "-"}
      </div>
    </div>
  );
}
