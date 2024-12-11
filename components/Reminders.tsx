"use client";

import AlertPopup from "@/popup/AlertPopup";
import { IReminder } from "@/interfaces";
import Loader from "./Loader";
import ReminderEntry from "@/components/ReminderEntry";
import ScrollContainer from "react-indiana-drag-scroll";
import axios from "axios";
import dayjs from "dayjs";
import uploadFile from "@/utils/uploadFile";
import useAction from "@/hooks/useAction";
import useLanguage from "@/hooks/useLanguage";
import useQuery from "@/hooks/useQuery";
import { useState } from "react";
import getUserClient from "@/utils/getUserClient";

export default function Reminders({ baseApiPath }: { baseApiPath?: string }) {
  const [lang] = useLanguage();
  const [isAlert, setIsAlert] = useState(false);
  const { data, isLoading } = useQuery<IReminder[]>(`${baseApiPath}/reminders`);
  const [tab, setTab] = useState<"current" | "upcoming" | "history">("current");

  const filteredData = data?.filter((reminder) => {
    const reminderAt = dayjs(reminder.reminderAt);
    const now = dayjs();
    if (tab === "current") {
      return reminderAt.isBefore(now);
    } else if (tab === "upcoming") {
      return reminderAt.isAfter(now);
    } else {
      return reminderAt.isBefore(now);
    }
  });

  const [isCreating, handleCreate] = useAction({
    promise: async (value) => {
      const {
        title = "",
        description = "",
        reminderAt = dayjs().toISOString(),
        files = []
      } = value.data;

      const userId = getUserClient().id;

      const fileUrls = await Promise.all(files.map(uploadFile));

      return axios.post(`${baseApiPath}/reminders`, {
        title,
        description,
        reminderAt: dayjs(reminderAt).toISOString(),
        userId,
        files: fileUrls
      });
    },
    successMessage:
      lang === "ar"
        ? "تم إنشاء التذكير بنجاح"
        : "Reminder created successfully",
    mutatePath: `${baseApiPath}/reminders`
  });

  const [isUpdating, handleUpdate] = useAction({
    promise: async (id) => {
      return axios.put(`${baseApiPath}/reminders`, {
        id
      });
    },
    successMessage:
      lang === "ar"
        ? "تم تحديث التذكير بنجاح"
        : "Reminder updated successfully",
    mutatePath: `${baseApiPath}/reminders`
  });

  return (
    <div className="dashboard__user__reminders">
      <div className="dashboard__user__reminders__header">
        <div className="dashboard__user__reminders__header__heading">
          {lang === "ar" ? "التنبيهات والتذكيرات" : "Alerts & Reminders"}
        </div>
        <button
          type="button"
          onClick={() => setIsAlert(!isAlert)}
          className="dashboard__user__reminders__header__btn"
        >
          {lang === "ar" ? "إنشاء" : "Create"}
        </button>
        {isAlert && (
          <AlertPopup
            onSubmit={handleCreate}
            onClose={() => setIsAlert(false)}
          />
        )}
      </div>
      <div className="dashboard__user__reminders__info">
        <ScrollContainer className="dashboard__user__reminders__info__navigation">
          <div
            className={
              "dashboard__user__reminders__info__navigation__entry" +
              (tab === "current" ? " active" : "")
            }
            onClick={() => setTab("current")}
          >
            {lang === "ar" ? "الحالي" : "Current"}
          </div>
          <div
            className={
              "dashboard__user__reminders__info__navigation__entry" +
              (tab === "upcoming" ? " active" : "")
            }
            onClick={() => setTab("upcoming")}
          >
            {lang === "ar" ? "القادم" : "Upcoming"}
          </div>
          <div
            className={
              "dashboard__user__reminders__info__navigation__entry" +
              (tab === "history" ? " active" : "")
            }
            onClick={() => setTab("history")}
          >
            {lang === "ar" ? "التاريخ" : "History"}
          </div>
        </ScrollContainer>
        <div className="dashboard__user__reminders__info__list">
          {isLoading ? (
            <div className="dashboard__user__reminders__info__list__empty">
              <Loader />
            </div>
          ) : filteredData?.length === 0 ? (
            <div className="dashboard__user__reminders__info__list__empty">
              {lang === "ar" ? "لا يوجد تذكيرات" : "No reminders"}
            </div>
          ) : (
            filteredData?.map((reminder: IReminder) => (
              <ReminderEntry
                key={reminder.id}
                data={reminder}
                onMarkAsRead={async (reminder: IReminder) => {
                  if (isCreating || isUpdating) return;
                  await handleUpdate(reminder.id);
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
