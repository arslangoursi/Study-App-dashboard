import Link from "next/link";
import { ReactNode } from "react";

export default function DetailBoxEntry({
  heading,
  children,
  link,
  file,
  linkTo
}: {
  heading?: string;
  children?: string | ReactNode;
  link?: string;
  file?: string;
  linkTo?: string;
}) {
  return (
    <div className="dashboard__transaction__entry">
      <div className="dashboard__transaction__entry__heading">{heading}</div>
      {children && (
        <div className="dashboard__transaction__entry__text">{children}</div>
      )}
      {link && linkTo && (
        <Link href={linkTo} className="dashboard__transaction__entry__link">
          {link || "-"}
        </Link>
      )}
      {file && linkTo && (
        <a href={linkTo} className="dashboard__transaction__entry__link">
          {file || "-"}
        </a>
      )}
    </div>
  );
}
