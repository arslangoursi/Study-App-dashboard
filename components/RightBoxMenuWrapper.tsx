import { IRightBoxMenuWrapper } from "@/interfaces";
import RightBoxMenuEntry from "./RightBoxMenuEntry";
import RightBoxMnuWrapperAdd from "./RightBoxMnuWrapperAdd";
import UserDetailEntry from "./UserDetailEntry";
import dayjs from "dayjs";

export default function RightBoxMenuWrapper({
  data,
  title,
  info,
  buttonTitle,
  onAdd,
  actions
}: IRightBoxMenuWrapper) {
  return (
    <div className="dashboard__user__bottom__right">
      <RightBoxMnuWrapperAdd
        title={`Add ${title}`}
        info={info}
        buttonTitle={buttonTitle}
        onAdd={onAdd}
      />
      {data.map((item) => (
        <RightBoxMenuEntry key={item.id} actions={actions} data={item}>
          {Object.entries(item)
            .filter(([key]) => key !== "id")
            .map(([key, value], index) => (
              <UserDetailEntry
                key={index}
                heading={key}
                text={
                  dayjs(value).isValid()
                    ? dayjs(value).format("DD MMM YYYY")
                    : value || "N/A"
                }
              />
            ))}
        </RightBoxMenuEntry>
      ))}
    </div>
  );
}
