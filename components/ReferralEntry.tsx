import { IReferral } from "@/interfaces";
import Link from "next/link";
import ListingCheckbox from "@/components/ListingCheckbox";
import ListingDate from "@/components/ListingDate";
import ListingStatus from "@/components/ListingStatus";
import { apiUrl } from "@/constants/constants";
import dayjs from "dayjs";
import preloadQuery from "@/hooks/preloadQuery";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import useLanguage from "@/hooks/useLanguage";
import { usePathname } from "next/navigation";

export default function ReferralEntry({
  item,
  selectedRows,
  setSelectedRows,
  processing
}: {
  item: IReferral;
  selectedRows: string[];
  setSelectedRows: (value: string[]) => void;
  processing: boolean;
}) {
  const [lang] = useLanguage();
  const pathname = usePathname();
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <Link
      key={item.id}
      href={pathname + "/" + item.id}
      className="listing__page__table__content__row"
      onMouseEnter={() => preloadQuery("/api/referrals/" + item.id)}
    >
      <div className="listing__page__table__content__row__entry checkbox">
        <ListingCheckbox
          checked={selectedRows.includes(item.id)}
          disabled={processing}
          onClick={() => {
            if (selectedRows.includes(item.id)) {
              setSelectedRows(selectedRows.filter((row) => row !== item.id));
            } else {
              setSelectedRows([...selectedRows, item.id]);
            }
          }}
        />
      </div>
      <div className="listing__page__table__content__row__entry">
        {item.number}
      </div>
      <div
        style={{
          justifyContent: "space-between"
        }}
        className="listing__page__table__content__row__entry"
      >
        {item.name}
        {!isCopied ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              copyToClipboard(apiUrl + "?ref=" + item.number);
            }}
            title={lang === "ar" ? "نسخ" : "Copy"}
            className="listing__page__table__content__row__entry__copy"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-copy"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </button>
        ) : (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5em"
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--golden"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {lang === "ar" ? "تم نسخه" : "Copied"}
          </span>
        )}
      </div>
      <ListingStatus
        value={dayjs(item.expiredAt).isBefore(dayjs()) ? "Expired" : "Active"}
      />
      <ListingDate date={item.createdAt} />
      <ListingDate date={item.expiredAt} />
    </Link>
  );
}
