"use client";

import { AnimatePresence, motion } from "framer-motion";

import { ChartUser } from "@/interfaces";
import ClickAwayListener from "react-click-away-listener";
import Link from "next/link";
import Loader from "./Loader";
import axios from "axios";
import useAction from "@/hooks/useAction";
import useLanguage from "@/hooks/useLanguage";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function UserNode({ data }: { data: ChartUser }) {
  const router = useRouter();
  const [lang] = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isChangingStatus, handleChangeStatus] = useAction({
    promise: () =>
      axios.put(`/api/users/${data.id}/status`, { status: data.status }),
    successMessage:
      lang === "ar" ? "تم تغيير الحالة بنجاح" : "Status changed successfully",
    mutatePath: `/api/users`
  });

  return (
    <div className="user__page__node__wrapper">
      <Link href={`${pathname}/${data.id}`} className="user__page__node">
        <img
          loading="lazy"
          src={data.picture || "https://placehold.co/50x50"}
          alt={data.name}
          width={50}
          height={50}
          className="user__page__node__img"
        />
        <div className="user__page__node__name">
          {data.name} ({data.designation})
        </div>
        <div className="user__page__node__email">{data.email}</div>
        <div className="user__page__node__department">{data.department}</div>
        <div
          className="user__page__node__status"
          style={{
            backgroundColor:
              data.status === "ACTIVE" ? "#2ecc71a0" : "#e74c3ca0"
          }}
        >
          {data.status === "ACTIVE"
            ? lang === "ar"
              ? "نشط"
              : "Active"
            : lang === "ar"
              ? "غير نشط"
              : "Inactive"}
        </div>
        <ClickAwayListener onClickAway={() => setIsMenuOpen(false)}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="user__page__node__actions"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="user__page__node__actions__button"
            >
              <svg
                width="3"
                height="9"
                viewBox="0 0 3 9"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.53403 3.85869C1.38431 3.85869 1.23796 3.90309 1.11347 3.98627C0.988988 4.06945 0.891964 4.18767 0.83467 4.32599C0.777375 4.46431 0.762385 4.61652 0.791593 4.76336C0.820801 4.9102 0.892897 5.04508 0.998763 5.15095C1.10463 5.25681 1.23951 5.32891 1.38635 5.35812C1.53319 5.38732 1.6854 5.37233 1.82372 5.31504C1.96204 5.25775 2.08026 5.16072 2.16344 5.03624C2.24662 4.91175 2.29102 4.76539 2.29102 4.61568C2.29102 4.41491 2.21126 4.22237 2.0693 4.08041C1.92734 3.93845 1.7348 3.85869 1.53403 3.85869ZM2.29102 7.83286C2.29102 7.98258 2.24662 8.12893 2.16344 8.25342C2.08026 8.3779 1.96204 8.47493 1.82372 8.53222C1.6854 8.58952 1.53319 8.60451 1.38635 8.5753C1.23951 8.54609 1.10463 8.47399 0.998763 8.36813C0.892897 8.26226 0.820801 8.12738 0.791593 7.98054C0.762385 7.8337 0.777375 7.6815 0.83467 7.54317C0.891964 7.40485 0.988988 7.28663 1.11347 7.20345C1.23796 7.12027 1.38431 7.07588 1.53403 7.07588C1.7348 7.07588 1.92734 7.15563 2.0693 7.29759C2.21126 7.43955 2.29102 7.63209 2.29102 7.83286ZM2.29102 1.3985C2.29102 1.54821 2.24662 1.69457 2.16344 1.81905C2.08026 1.94354 1.96204 2.04056 1.82372 2.09786C1.6854 2.15515 1.53319 2.17014 1.38635 2.14093C1.23951 2.11173 1.10463 2.03963 0.998763 1.93376C0.892897 1.8279 0.820801 1.69302 0.791593 1.54618C0.762385 1.39934 0.777375 1.24713 0.83467 1.10881C0.891964 0.97049 0.988988 0.852265 1.11347 0.769086C1.23796 0.685908 1.38431 0.641512 1.53403 0.641512C1.7348 0.641512 1.92734 0.721265 2.0693 0.863227C2.21126 1.00519 2.29102 1.19773 2.29102 1.3985Z" />
              </svg>
            </button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // @ts-ignore
                  className="user__page__node__actions__menu"
                >
                  <button
                    type="button"
                    disabled={isChangingStatus}
                    onMouseEnter={() => {
                      router.prefetch(
                        `${pathname}/create?parentId=${
                          data.id
                        }&noOfChildrenOfParent=${data.children?.length || 0}`
                      );
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setIsMenuOpen(false);
                      router.push(
                        `${pathname}/create?parentId=${
                          data.id
                        }&noOfChildrenOfParent=${data.children?.length || 0}`
                      );
                    }}
                  >
                    {lang === "ar" ? "إضافة" : "Add"}
                  </button>
                  <button
                    type="button"
                    disabled={isChangingStatus}
                    onClick={async (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      await handleChangeStatus();
                      setIsMenuOpen(false);
                    }}
                  >
                    {isChangingStatus && <Loader small />}
                    {lang === "ar" ? "تغيير الحالة" : "Change Status"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ClickAwayListener>
      </Link>
    </div>
  );
}
