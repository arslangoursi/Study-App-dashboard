"use client";

import { useEffect, useState } from "react";

import CurrencyDisplay from "./CurrencyDisplay";
import InputFile from "./InputFile";
import Link from "next/link";
import Loader from "./Loader";
import axios from "axios";
import dayjs from "dayjs";
import numberDisplay from "@/utils/numberDisplay";
import { propertyTaxPercentage } from "@/constants/constants";
import { toast } from "react-toastify";
import uploadFile from "@/utils/uploadFile";
import useAction from "@/hooks/useAction";
import useLanguage from "@/hooks/useLanguage";

export default function InvoiceGateway({ invoice }: { invoice: any }) {
  const [lang] = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(
    invoice.transactions.every((transaction: any) => transaction.file !== null)
  );

  const totalPrice = invoice.properties.reduce(
    (acc: number, property: any) => acc + (property.owners[0].unitPrice || 0),
    0
  );

  const totalCommission = totalPrice * propertyTaxPercentage;

  const transactionStatuses = invoice.transactions.map(
    (transaction: any) => transaction.status
  );
  const isApproved = transactionStatuses.every(
    (status: string) => status === "APPROVED"
  );
  const isPending = transactionStatuses.every(
    (status: string) => status === "PENDING"
  );
  const isRejected = transactionStatuses.every(
    (status: string) => status === "REJECTED"
  );

  const [isSubmitting, handleSubmit] = useAction({
    promise: async (e) => {
      e.preventDefault();

      if (!file) {
        toast.error(
          lang === "ar"
            ? "الرجاء تحميل ملف الدفع"
            : "Please upload the proof file"
        );
        return Promise.reject();
      }

      const fileUrl = await uploadFile(file);

      return axios.post("/api/invoices/gateway", {
        invoiceId: invoice.id,
        fileUrl
      });
    },
    successMessage:
      lang === "ar"
        ? "تم تقديم الفاتورة بنجاح"
        : "Invoice has been submitted successfully",
    onSuccess: () => setIsSubmitted(true)
  });

  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  const [termsPopupOpen, setTermsPopupOpen] = useState(false);
  const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] =
    useState(false);

  return (
    <div className="invoice__container__body">
      <div className="invoice__container__body__header">
        <div className="invoice__container__body__header__heading">
          {lang === "ar" ? "عرض السعر" : "Invoice"}
        </div>
        <div className="invoice__container__body__header__details">
          <a
            href="https://lavieyard.com"
            target="_blank"
            rel="noreferrer"
            className="invoice__container__body__header__details__entry"
          >
            lavieyard.com
          </a>
          <a
            href="tel:9200000077"
            className="invoice__container__body__header__details__entry"
          >
            9200000077
          </a>
          <a
            href="mailto:sales@zood.sa"
            className="invoice__container__body__header__details__entry"
          >
            sales@zood.sa
          </a>
          <div className="invoice__container__body__header__details__entry">
            <button
              onClick={() => {
                navigator.clipboard.writeText("SA0220000002184851899940");
                setCopied(true);
              }}
              className={
                "invoice__container__body__header__details__entry__button" +
                (isCopied ? "  copied" : "")
              }
            >
              {isCopied ? (
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
                  className="feather feather-check"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
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
                  className="feather feather-copy"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
            SA0220000002184851899940
          </div>
        </div>
      </div>
      <div className="invoice__container__body__details">
        <div className="invoice__container__body__details__customer">
          <div className="invoice__container__body__details__customer__heading">
            {lang === "ar" ? "المستفيد" : "Billed To"}
          </div>
          <div className="invoice__container__body__details__customer__body">
            <div className="invoice__container__body__details__customer__body__entry">
              {invoice.customer.name}
            </div>
            <div className="invoice__container__body__details__customer__body__entry">
              {invoice.customer.email}
            </div>
            <div className="invoice__container__body__details__customer__body__entry">
              {invoice.customer.phone}
            </div>
          </div>
        </div>
        <div className="invoice__container__body__details__invoice">
          <div className="invoice__container__body__details__invoice__entry">
            <div className="invoice__container__body__details__invoice__entry__heading">
              {lang === "ar" ? "تاريخ الاستحقاق" : "Invoice Number"}
            </div>
            <div className="invoice__container__body__details__invoice__entry__value">
              {invoice.number}
            </div>
          </div>
          <div className="invoice__container__body__details__invoice__entry">
            <div className="invoice__container__body__details__invoice__entry__heading">
              {lang === "ar" ? "تاريخ الإصدار" : "Date Issued"}
            </div>
            <div className="invoice__container__body__details__invoice__entry__value">
              {dayjs(invoice.createdAt).format("DD MMM YYYY")}
            </div>
          </div>
          <div className="invoice__container__body__details__invoice__entry">
            <div className="invoice__container__body__details__invoice__entry__heading">
              {lang === "ar" ? "قيمة الوحدة" : "Total Amount"}
            </div>
            <div className="invoice__container__body__details__invoice__entry__value">
              <CurrencyDisplay>{invoice.amount}</CurrencyDisplay>
            </div>
          </div>
          <div className="invoice__container__body__details__invoice__entry">
            <div className="invoice__container__body__details__invoice__entry__heading">
              {lang === "ar" ? "مبلغ الحجز" : "BookingFee"}
            </div>
            <div className="invoice__container__body__details__invoice__entry__value">
              <CurrencyDisplay>
                {invoice.amount * propertyTaxPercentage}
              </CurrencyDisplay>
            </div>
          </div>
        </div>
      </div>
      {isSubmitted ? (
        <div
          className="invoice__container__body__info"
          style={{
            color:
              isApproved || isPending ? "#28a745" : isRejected ? "#dc3545" : "",
            backgroundColor: isApproved
              ? "#d4edda"
              : isPending
                ? "var(--goldenLight)"
                : isRejected
                  ? "#f8d7da"
                  : ""
          }}
        >
          {isApproved ? (
            lang === "ar" ? (
              <>
                تمت الموافقة على الفاتورة. يمكنك الآن زيارة{" "}
                <Link href="/login">اللوحة</Link>.
              </>
            ) : (
              <>
                Invoice has been approved. You can now visit the{" "}
                <Link href="/login">Dashboard</Link>.
              </>
            )
          ) : isPending ? (
            lang === "ar" ? (
              <>
                الفاتورة قيد الانتظار. لا تتردد في زيارة{" "}
                <Link href="/login">اللوحة</Link> في الوقت الحالي.
              </>
            ) : (
              <>
                Invoice is pending. Feel free to visit the{" "}
                <Link href="/login">Dashboard</Link> in the meantime.
              </>
            )
          ) : isRejected ? (
            lang === "ar" ? (
              <>
                تم رفض الفاتورة. يمكنك مراجعة <Link href="/login">اللوحة</Link>{" "}
                لمزيد من التفاصيل.
              </>
            ) : (
              <>
                Invoice has been rejected. you can review the{" "}
                <Link href="/login">Dashboard</Link> for more details.
              </>
            )
          ) : null}
        </div>
      ) : null}
      <div className="invoice__container__body__table">
        <div className="invoice__container__body__table__header">
          <div className="invoice__container__body__table__header__entry">
            {lang === "ar" ? "المشروع" : "Project"}
          </div>
          <div className="invoice__container__body__table__header__entry">
            {invoice.application.map.type === "LAND"
              ? lang === "ar"
                ? "الخريطة"
                : "Map"
              : lang === "ar"
                ? "البرج"
                : "Tower"}
          </div>
          <div className="invoice__container__body__table__header__entry">
            {invoice.application.map.type === "LAND"
              ? lang === "ar"
                ? "بلوك"
                : "Block"
              : lang === "ar"
                ? "طابق"
                : "Floor"}
          </div>
          <div className="invoice__container__body__table__header__entry">
            {invoice.application.map.type === "LAND"
              ? lang === "ar"
                ? "قطعة"
                : "Plot"
              : lang === "ar"
                ? "وحدة"
                : "Unit"}
          </div>
          <div className="invoice__container__body__table__header__entry">
            {lang === "ar" ? "المساحة" : "Area"}
          </div>
          <div className="invoice__container__body__table__header__entry">
            {lang === "ar" ? "المبلغ الإجمالي" : "Total Amount"}
          </div>
          <div className="invoice__container__body__table__header__entry">
            {lang === "ar" ? "مبلغ الحجز" : "BookingFee"}
          </div>
        </div>
        <div className="invoice__container__body__table__body">
          {invoice.properties.map((property: any, index: number) => (
            <div
              className="invoice__container__body__table__body__row"
              key={index}
            >
              <div className="invoice__container__body__table__body__row__entry">
                {lang === "ar"
                  ? invoice.application.project.name.ar
                  : invoice.application.project.name.en}
              </div>
              <div className="invoice__container__body__table__body__row__entry">
                {invoice.application.map.type === "LAND"
                  ? lang === "ar"
                    ? invoice.application.map.name.ar
                    : invoice.application.map.name.en
                  : property.tower}
              </div>
              <div className="invoice__container__body__table__body__row__entry">
                {invoice.application.map.type === "LAND"
                  ? property.block
                  : property.floor}
              </div>
              <div className="invoice__container__body__table__body__row__entry">
                {invoice.application.map.type === "LAND"
                  ? property.plot
                  : property.unit}
              </div>
              <div className="invoice__container__body__table__body__row__entry">
                {numberDisplay(property.area)} {lang === "ar" ? "م²" : "m²"}
              </div>
              <div className="invoice__container__body__table__body__row__entry">
                <CurrencyDisplay>
                  {property.owners[0].unitPrice}
                </CurrencyDisplay>
              </div>
              <div className="invoice__container__body__table__body__row__entry">
                <CurrencyDisplay>
                  {property.owners[0].unitPrice * propertyTaxPercentage}
                </CurrencyDisplay>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="invoice__container__body__total">
        <img loading="lazy" src="/invoice_qr.jpeg" alt="QR Code" />
        <div className="invoice__container__body__total__row">
          <div className="invoice__container__body__total__row__label">
            {lang === "ar" ? "المبلغ المستحق" : "Amount Due"}
          </div>
          <div className="invoice__container__body__total__row__value">
            <CurrencyDisplay>{totalCommission}</CurrencyDisplay>
          </div>
        </div>
      </div>
      {!isSubmitted ? (
        <>
          <div className="invoice__container__terms">
            {termsPopupOpen && (
              <div className="invoice__container__terms__popup">
                <div className="invoice__container__terms__popup__content">
                  <button
                    type="button"
                    onClick={() => setTermsPopupOpen(false)}
                    className="invoice__container__terms__popup__button"
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
                  <div className="invoice__container__terms__popup__content__heading">
                    {lang === "ar" ? "الشروط والأحكام" : "Terms and Conditions"}
                  </div>
                  {lang === "ar" ? (
                    <>
                      <div className="invoice__container__terms__popup__content__info">
                        1- هذه الاستمارة لا تعد ضمانة حق لبيع او شراء وحدة أو
                        وحدات، ولكنها تعد حجز للوحدة
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        2- يلتزم المشتري بإرسال إشعار التحويل لمبلغ الحجز علي
                        البريد الإلكتروني المسجل خلال مدة لا تزيد عن 24 ساعة، و
                        إلا يعد الحجز لاغي
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        3- مهلة الحجز للتعاقد 5 أيام من تاريخ إعلان بدء مرحلة
                        التعاقدات
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        4- لا يُعتد بهذا الحجز إلا بموجب رسالة تأكيد من الشركة
                        بعد استلام المبلغ من العميل
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        5- المبلغ المدفوع سوف يتم خصمه من الدفعة المقدمة للوحدة
                        / الوحدات النهائية عند التعاقد
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        6- الأسعار لا تشمل الضريبة
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        7- تسدد كافة المبالغ على حساب ضمان مشروع لافي يارد في
                        بنك الرياض، أيبان رقم (SA0220000002184851899940)
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        ( sales@zood.sa )
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="invoice__container__terms__popup__content__info">
                        1- This form does not guarantee the right to sell or
                        purchase a unit or units; it serves as a Bookingfor the
                        unit.
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        2- The buyer must send a transfer notification for the
                        Bookingamount to the registered email within 24 hours;
                        otherwise, the Bookingis considered void.
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        3- The Bookingperiod for the contract is 5 days from the
                        announcement date of the contracting phase.
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        4- This Bookingis only valid with a confirmation message
                        from the company after receiving the amount from the
                        client.
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        5- The paid amount will be deducted from the down
                        payment for the final unit(s) at the time of
                        contracting.
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        6- Prices do not include tax.
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        7- All payments are to be made to the escrow account of
                        the Lafi Yard project at Riyad Bank, IBAN number
                        (SA0220000002184851899940).
                      </div>
                      <div className="invoice__container__terms__popup__content__info">
                        ( sales@zood.sa )
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            <div className="invoice__container__terms__checkbox">
              <input
                type="checkbox"
                id="policy"
                value={termsAndConditionsAccepted ? "true" : "false"}
                onChange={() =>
                  setTermsAndConditionsAccepted(!termsAndConditionsAccepted)
                }
              />
              <label htmlFor="policy">
                {lang === "ar" ? (
                  <>
                    أقر بأنني قد قرأت وأوافق على
                    <span
                      onClick={() => setTermsPopupOpen(true)}
                      className="invoice__container__terms__checkbox__terms"
                    >
                      الشروط والأحكام
                    </span>
                  </>
                ) : (
                  <>
                    I acknowledge that I have read and agree to the
                    <span onClick={() => setTermsPopupOpen(true)}>
                      Terms and Conditions
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="invoice__container__submit">
            <div className="invoice__container__submit__file">
              <InputFile
                label={lang === "ar" ? "تحميل الصور" : "Upload Payment Proof"}
                id="upload-proof"
                value={file}
                onChange={setFile}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !termsAndConditionsAccepted}
              className="invoice__container__submit__btn"
            >
              {isSubmitting && <Loader small />}
              {lang === "ar" ? "إرسال" : "Submit"}
            </button>
          </form>
        </>
      ) : null}
    </div>
  );
}
