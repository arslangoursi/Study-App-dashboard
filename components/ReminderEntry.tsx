"use client";

import { IReminder } from "@/interfaces";
import Link from "next/link";
import Loader from "./Loader";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";

dayjs.extend(relativeTime);

export default function ReminderEntry({
  data,
  onMarkAsRead
}: {
  data: IReminder;
  onMarkAsRead: (data: IReminder) => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const { title, description, files, reminderAt, user, isDone } = data;

  return (
    <div className="dashboard__user__reminders__info__list__entry">
      <div className="dashboard__user__reminders__info__list__entry__left">
        <div className="dashboard__user__reminders__info__list__entry__left__heading">
          {title}
        </div>
        <div className="dashboard__user__reminders__info__list__entry__left__text">
          {description}
        </div>
        <div className="dashboard__user__reminders__info__list__entry__left__files">
          {files.map((file, index) => (
            <ReminderFileEntry key={index} href={file}>
              {file.split("/").pop() as string}
            </ReminderFileEntry>
          ))}
        </div>
        <div className="dashboard__user__reminders__info__list__entry__left__date">
          <div className="dashboard__user__reminders__info__list__entry__left__date__time">
            {dayjs(reminderAt).fromNow()}
          </div>
          <div className="dashboard__user__reminders__info__list__entry__left__date__user">
            {user.name}
          </div>
        </div>
      </div>
      {dayjs(reminderAt).isBefore(dayjs()) && !isDone && (
        <button
          type="button"
          onClick={async () => {
            setIsProcessing(true);
            await onMarkAsRead(data);
            setIsProcessing(false);
          }}
          className="dashboard__user__reminders__info__list__entry__right"
        >
          {isProcessing ? (
            <Loader />
          ) : (
            <>
              Mark <br />
              as read
            </>
          )}
        </button>
      )}
    </div>
  );
}

function ReminderFileEntry({
  children,
  href
}: {
  children: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="dashboard__user__reminders__info__list__entry__left__files__entry"
    >
      <svg
        width="14"
        height="17"
        viewBox="0 0 14 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.66667 0V5.41667C6.66668 5.7274 6.78243 6.02699 6.99135 6.25702C7.20026 6.48704 7.48737 6.631 7.79667 6.66083L7.91667 6.66667H13.3333V15C13.3335 15.4205 13.1747 15.8255 12.8888 16.1338C12.6028 16.4421 12.211 16.631 11.7917 16.6625L11.6667 16.6667H1.66667C1.24619 16.6668 0.841195 16.508 0.532877 16.2221C0.224559 15.9362 0.0357028 15.5443 0.00416685 15.125L8.35567e-08 15V1.66667C-0.000132983 1.24619 0.158672 0.841194 0.444581 0.532877C0.73049 0.224559 1.12237 0.0357028 1.54167 0.00416676L1.66667 0H6.66667ZM8.33333 0.0358333C8.60282 0.0930415 8.85391 0.216157 9.06417 0.394167L9.16667 0.488333L12.845 4.16667C13.0403 4.36176 13.184 4.60229 13.2633 4.86667L13.2967 5H8.33333V0.0358333Z"
          fill="#c2832c"
        />
      </svg>
      <div className="dashboard__user__reminders__info__list__entry__left__files__entry__name">
        {children}
      </div>
    </Link>
  );
}
