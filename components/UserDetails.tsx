"use client";

import { JSX, useState } from "react";
import { parseAsString, useQueryState } from "nuqs";

import Bg from "/public/userbg.webp";
import ContractPopup from "@/popup/ContractPopup";
import DeletePopup from "@/popup/DeletePopup";
import ExperiencePopup from "@/popup/ExperiencePopup";
import FamilyDetailPopup from "@/popup/FamilyDetailPopup";
import { IUser } from "@/interfaces";
import ProfilePopup from "@/popup/ProfilePopup";
import QualificationsPopup from "@/popup/QualificationsPopup";
import RightBoxMenuWrapper from "@/components/RightBoxMenuWrapper";
import ScrollContainer from "react-indiana-drag-scroll";
import UserDetailEntry from "@/components/UserDetailEntry";
import axios from "axios";
import dayjs from "dayjs";
import uploadFile from "@/utils/uploadFile";
import useAction from "@/hooks/useAction";
import useLanguage from "@/hooks/useLanguage";
import StartIcon from "@/icons/StartIcon";
import Loader from "@/components/Loader";
import Image from "next/image";

export default function UserDetails({
  data,
  navigationTabs
}: {
  data: IUser;
  navigationTabs: { icon: JSX.Element; name: string }[];
}) {
  const [lang] = useLanguage();
  const [selectedTab, setSelectedTab] = useQueryState(
    "tab",
    parseAsString.withDefault("qualification")
  );
  const [editProfile, setEditProfile] = useState(false);
  const [familyDetailPopup, setAddFamilyDetailPopup] = useState(false);
  const [familyInitialData, setFamilyInitialData] = useState<any | null>(null);
  const [qualificationPopup, setAddQualificationPopup] = useState(false);
  const [qualificationInitialData, setQualificationInitialData] = useState<
    any | null
  >(null);
  const [experiencePopupOpen, setAddExperiencePopupOpen] = useState(false);
  const [experienceInitialData, setExperienceInitialData] = useState<
    any | null
  >(null);
  const [deletePopup, setDeletePopup] = useState<
    null | "qualification" | "experience" | "family"
  >(null);
  const [contractPopupOpen, setContractPopupOpen] = useState(false);

  const handleDelete = useAction({
    promise: () => {
      const deleteMap = {
        qualification: () =>
          axios.delete(`/api/users/${data.id}/qualifications`, {
            data: { id: qualificationInitialData?.id }
          }),
        experience: () =>
          axios.delete(`/api/users/${data.id}/experiences`, {
            data: { id: experienceInitialData?.id }
          }),
        family: () =>
          axios.delete(`/api/users/${data.id}/family`, {
            data: { id: familyInitialData?.id }
          })
      };
      return deletePopup
        ? deleteMap[deletePopup]?.()
        : Promise.resolve({ data: null });
    },
    successMessage: lang === "ar" ? "تم الحذف بنجاح" : "Deleted successfully",
    onSuccess: () => {
      setDeletePopup(null);
      setExperienceInitialData(null);
      setFamilyInitialData(null);
      setQualificationInitialData(null);
    },
    needsConfirmation: true
  })[1];

  const handleEdit = useAction({
    promise: async (value: any) => {
      const { picture: pictureFile, dateOfBirth, ...rest } = value.data;

      const picture = await uploadFile(pictureFile);

      return axios.put(`/api/users/${data.id}`, {
        ...rest,
        picture,
        dateOfBirth: dayjs(dateOfBirth).toISOString()
      });
    },
    successMessage: lang === "ar" ? "تم التحديث بنجاح" : "Updated successfully"
  })[1];

  const handleAddOrEdit = (
    url: string,
    method: "post" | "put",
    successMessage: string
  ) =>
    useAction({
      promise: (value: any) => {
        const { startDate, endDate, dateOfBirth, ...rest } = value.data;
        return axios[method](url, {
          ...rest,
          startDate: startDate ? dayjs(startDate).toISOString() : undefined,
          endDate: endDate ? dayjs(endDate).toISOString() : undefined,
          dateOfBirth: dateOfBirth
            ? dayjs(dateOfBirth).toISOString()
            : undefined
        });
      },
      successMessage
    })[1];

  const handleAddQualification = handleAddOrEdit(
    `/api/users/${data.id}/qualifications`,
    "post",
    lang === "ar" ? "تمت الإضافة بنجاح" : "Added successfully"
  );
  const handleEditQualification = handleAddOrEdit(
    `/api/users/${data.id}/qualifications`,
    "put",
    lang === "ar" ? "تم التحديث بنجاح" : "Updated successfully"
  );
  const handleAddExperience = handleAddOrEdit(
    `/api/users/${data.id}/experiences`,
    "post",
    lang === "ar" ? "تمت الإضافة بنجاح" : "Added successfully"
  );
  const handleEditExperience = handleAddOrEdit(
    `/api/users/${data.id}/experiences`,
    "put",
    lang === "ar" ? "تم التحديث بنجاح" : "Updated successfully"
  );
  const handleAddFamilyDetail = handleAddOrEdit(
    `/api/users/${data.id}/families`,
    "post",
    lang === "ar" ? "تمت الإضافة بنجاح" : "Added successfully"
  );
  const handleEditFamilyDetail = handleAddOrEdit(
    `/api/users/${data.id}/families`,
    "put",
    lang === "ar" ? "تم التحديث بنجاح" : "Updated successfully"
  );

  const handleContractEdit = useAction({
    promise: (value: any) => {
      const { startDate, endDate, salary, ...rest } = value.data;
      return axios.put(`/api/users/${data.id}/contract`, {
        ...rest,
        startDate: dayjs(startDate).toISOString(),
        endDate: endDate ? dayjs(endDate).toISOString() : null,
        salary: parseInt(salary),
        wage: parseInt(rest.wage),
        houseAllowance: parseInt(rest.houseAllowance),
        transportAllowance: parseInt(rest.transportAllowance),
        otherAllowance: parseInt(rest.otherAllowance),
        otherDeduction: parseInt(rest.otherDeduction)
      });
    },
    successMessage: lang === "ar" ? "تم التحديث بنجاح" : "Updated successfully",
    onSuccess: () => setContractPopupOpen(false)
  })[1];

  const [isAccessLoading, handleChangeAccess] = useAction({
    promise: () => axios.put(`/api/users/${data.id}/access`, {}),
    successMessage: lang === "ar" ? "تم التحديث بنجاح" : "Updated successfully"
  });

  return (
    <>
      {deletePopup && (
        <DeletePopup
          onSubmit={handleDelete}
          onClose={() => setDeletePopup(null)}
        />
      )}
      {qualificationPopup && (
        <QualificationsPopup
          onSubmit={
            qualificationInitialData !== null
              ? handleEditQualification
              : handleAddQualification
          }
          isEdit={qualificationInitialData !== null}
          initialData={
            qualificationInitialData || {
              id: null,
              title: "",
              institute: "",
              location: "",
              startDate: "",
              stillWorking: false,
              endDate: null as null | string,
              description: ""
            }
          }
          onClose={() => setAddQualificationPopup(false)}
        />
      )}
      {experiencePopupOpen && (
        <ExperiencePopup
          onSubmit={
            experienceInitialData !== null
              ? handleEditExperience
              : handleAddExperience
          }
          isEdit={experienceInitialData !== null}
          initialData={
            experienceInitialData || {
              id: null,
              title: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              description: ""
            }
          }
          onClose={() => setAddExperiencePopupOpen(false)}
        />
      )}
      {familyDetailPopup && (
        <FamilyDetailPopup
          onSubmit={
            familyInitialData !== null
              ? handleEditFamilyDetail
              : handleAddFamilyDetail
          }
          isEdit={familyInitialData !== null}
          initialData={
            familyInitialData || {
              id: null,
              name: "",
              relation: "",
              dateOfBirth: ""
            }
          }
          onClose={() => setAddFamilyDetailPopup(false)}
        />
      )}
      {editProfile && (
        <ProfilePopup
          onSubmit={handleEdit}
          isEdit={true}
          initialData={{
            picture: data?.picture,
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
            department: data?.department,
            workPhone: data?.workPhone,
            workEmail: data?.workEmail,
            workAddress: data?.workAddress,
            bankAccount: data?.bankAccount,
            dateOfBirth: dayjs(data?.dateOfBirth).format("YYYY-MM-DD"),
            status: data?.status
          }}
          onClose={() => setEditProfile(false)}
        />
      )}
      {contractPopupOpen && (
        <ContractPopup
          onClose={() => setContractPopupOpen(false)}
          onSubmit={handleContractEdit}
          initialData={{
            salary: data?.userContract?.salary?.toString() || "",
            wage: data?.userContract?.wage?.toString() || "",
            transportAllowance:
              data?.userContract?.transportAllowance?.toString() || "",
            houseAllowance:
              data?.userContract?.houseAllowance?.toString() || "",
            otherAllowance:
              data?.userContract?.otherAllowance?.toString() || "",
            otherDeduction:
              data?.userContract?.otherDeduction?.toString() || "",
            startDate: dayjs(data?.userContract?.startDate).format(
              "YYYY-MM-DD"
            ),
            endDate: data?.userContract?.endDate
              ? dayjs(data?.userContract?.endDate).format("YYYY-MM-DD")
              : ""
          }}
        />
      )}
      <div className="dashboard__user__upper">
        <button
          className="seller__baj__entry"
          onClick={handleChangeAccess}
          disabled={isAccessLoading}
        >
          <div className="seller__baj__entry__svg">
            {isAccessLoading ? <Loader small /> : <StartIcon />}
          </div>
          {data?.hasContentEditAccess
            ? lang === "ar"
              ? "إلغاء الوصول إلى التحرير"
              : "Revoke Edit Access"
            : lang === "ar"
              ? "الوصول إلى التحرير"
              : "Grant Edit Access"}
        </button>
        <div className="dashboard__user__upper__info">
          <div className="dashboard__user__upper__info__img">
            <div
              className="dashboard__user__upper__info__img"
              style={{ width: "100%", height: 250, border: "none" }}
            >
              <div
                className="create__user__section__image__upload__inner"
                style={{
                  width: "100%",
                  height: 250,
                  borderRadius: "10px 10px 0 0"
                }}
              >
                <Image
                  src={Bg.src}
                  className="create__user__section__image__upload__inner__preview"
                  height={140}
                  width={140}
                  style={{ objectFit: "cover" }}
                  alt="Image Preview"
                />
              </div>
            </div>
          </div>
          <div className="dashboard__user__upper__info__profile">
            <div>
              <div
                className="create__user__section__image__upload"
                style={{
                  width: 100,
                  height: 100,
                  border: "2px solid white"
                }}
              >
                <div
                  className="create__user__section__image__upload__inner"
                  style={{ width: 100, height: 100 }}
                >
                  <Image
                    src={data.picture || "https://placehold.co/50x50"}
                    className="create__user__section__image__upload__inner__preview"
                    height={140}
                    width={140}
                    style={{ objectFit: "cover" }}
                    alt="Image Preview"
                  />
                </div>
              </div>
            </div>
            <div className="dashboard__user__upper__info__profile__text">
              <div className="dashboard__user__upper__info__profile__name">
                {data?.name}
              </div>
              <div className="dashboard__user__upper__info__profile__role">
                {data?.department}
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard__user__upper__navigation">
          <ScrollContainer className="dashboard__user__upper__navigation__entries">
            {navigationTabs.map((tab) => (
              <button
                type="button"
                key={tab.name}
                className={
                  selectedTab === tab.name.toLowerCase()
                    ? "dashboard__user__upper__navigation__entry__active"
                    : "dashboard__user__upper__navigation__entry"
                }
                onClick={() => setSelectedTab(tab.name.toLowerCase())}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </ScrollContainer>
        </div>
      </div>
      <div className="dashboard__user__bottom">
        <div className="dashboard__user__bottom__left">
          <div className="dashboard__user__bottom__left__heading">
            {lang === "ar" ? "حول" : "About"}
            <button
              type="button"
              className="dashboard__user__bottom__left__heading__btn"
              onClick={() => setEditProfile(true)}
            >
              {lang === "ar" ? "تعديل" : "Edit"}
            </button>
          </div>
          <UserDetailEntry
            heading={lang === "ar" ? "معرّف الموظف" : "Employee ID"}
            text={data?.id}
          />
          <UserDetailEntry
            heading={lang === "ar" ? "البريد الإلكتروني" : "Email"}
            text={data?.email}
          />
          <UserDetailEntry
            heading={lang === "ar" ? "الهاتف" : "Phone"}
            text={data?.phone}
          />
          <UserDetailEntry
            heading={lang === "ar" ? "القسم" : "Department"}
            text={data?.department}
          />
          <UserDetailEntry
            heading={lang === "ar" ? "هاتف العمل" : "Work Phone"}
            text={data?.workPhone}
          />
          <UserDetailEntry
            heading={lang === "ar" ? "بريد العمل الإلكتروني" : "Work Email"}
            text={data?.workEmail}
          />
          <UserDetailEntry
            heading={lang === "ar" ? "عنوان العمل" : "Work Address"}
            text={data?.workAddress}
          />
          <UserDetailEntry
            heading={lang === "ar" ? "حساب البنك" : "Bank Account"}
            text={data?.bankAccount}
          />
          <UserDetailEntry
            heading={lang === "ar" ? "تاريخ الميلاد" : "Date of Birth"}
            text={dayjs(data?.dateOfBirth).format("DD MMM YYYY")}
          />
          <UserDetailEntry
            heading={lang === "ar" ? "الحالة" : "Status"}
            text={data?.status}
          />
        </div>
        {selectedTab === "qualification" ? (
          <RightBoxMenuWrapper
            data={data?.userQualifications || []}
            title="Qualification"
            info="Add here your qualification details"
            buttonTitle={lang === "ar" ? "أضف مؤهل" : "Add Qualification"}
            onAdd={() => setAddQualificationPopup(true)}
            actions={[
              {
                title: "Edit",
                onClick: (data) => {
                  setQualificationInitialData(data);
                  setAddQualificationPopup(true);
                }
              },
              {
                title: "Delete",
                onClick: (data) => {
                  setQualificationInitialData(data);
                  setDeletePopup("qualification");
                }
              }
            ]}
          />
        ) : selectedTab === "experience" ? (
          <RightBoxMenuWrapper
            data={data?.userExperiences || []}
            title="Experience"
            info="Add here your experience details"
            buttonTitle={lang === "ar" ? "أضف مؤهل" : "Add Qualification"}
            onAdd={() => setAddExperiencePopupOpen(true)}
            actions={[
              {
                title: "Edit",
                onClick: (data) => {
                  setExperienceInitialData(data);
                  setAddExperiencePopupOpen(true);
                }
              },
              {
                title: "Delete",
                onClick: (data) => {
                  setExperienceInitialData(data);
                  setDeletePopup("experience");
                }
              }
            ]}
          />
        ) : selectedTab === "family" ? (
          <RightBoxMenuWrapper
            data={data?.userFamily || []}
            title="Family"
            info="Add here your family details"
            buttonTitle="Add Family Detail"
            onAdd={() => setAddFamilyDetailPopup(true)}
            actions={[
              {
                title: "Edit",
                onClick: (data) => {
                  setFamilyInitialData(data);
                  setAddFamilyDetailPopup(true);
                }
              },
              {
                title: "Delete",
                onClick: (data) => {
                  setFamilyInitialData(data);
                  setDeletePopup("family");
                }
              }
            ]}
          />
        ) : selectedTab === "contract" ? (
          <div className="dashboard__user__bottom__left">
            <div className="dashboard__user__bottom__left__heading">
              {lang === "ar" ? "عقد" : "Contract"}
              <button
                type="button"
                className="dashboard__user__bottom__left__heading__btn"
                onClick={() => setContractPopupOpen(true)}
              >
                {lang === "ar" ? "تعديل" : "Edit"}
              </button>
            </div>
            <UserDetailEntry
              heading={lang === "ar" ? "راتب" : "Salary"}
              text={
                data?.userContract?.salary
                  ? data?.userContract?.salary.toString()
                  : ""
              }
            />
            <UserDetailEntry
              heading={lang === "ar" ? "تاريخ البدء" : "Start Date"}
              text={dayjs(data?.userContract?.startDate).format("DD MMM YYYY")}
            />
            <UserDetailEntry
              heading={lang === "ar" ? "تاريخ الانتهاء" : "End Date"}
              text={
                data?.userContract?.endDate
                  ? dayjs(data?.userContract?.endDate).format("DD MMM YYYY")
                  : ""
              }
            />
            <UserDetailEntry
              heading={lang === "ar" ? "أجر" : "Wage"}
              text={
                data?.userContract?.wage
                  ? data?.userContract?.wage.toString()
                  : ""
              }
            />
            <UserDetailEntry
              heading={lang === "ar" ? "بدل السكن" : "House Allowance"}
              text={
                data?.userContract?.houseAllowance
                  ? data?.userContract?.houseAllowance.toString()
                  : ""
              }
            />
            <UserDetailEntry
              heading={lang === "ar" ? "بدل النقل" : "Transport Allowance"}
              text={
                data?.userContract?.transportAllowance
                  ? data?.userContract?.transportAllowance.toString()
                  : ""
              }
            />
            <UserDetailEntry
              heading={lang === "ar" ? "بدل آخر" : "Other Allowance"}
              text={
                data?.userContract?.otherAllowance
                  ? data?.userContract?.otherAllowance.toString()
                  : ""
              }
            />
            <UserDetailEntry
              heading={lang === "ar" ? "خصم آخر" : "Other Deduction"}
              text={
                data?.userContract?.otherDeduction
                  ? data?.userContract?.otherDeduction.toString()
                  : ""
              }
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
