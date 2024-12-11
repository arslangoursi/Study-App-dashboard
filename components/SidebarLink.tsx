"use client";

import { ILinks } from "@/interfaces";
import clsx from "clsx";
import preloadQuery from "@/hooks/preloadQuery";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import Loader from "@/components/Loader";

interface ISidebarLink {
  child: ILinks["children"][0];
  userType: string;
  lang: string;
  onClick: () => void;
  startTransition: (data: any) => void;
  isPending: boolean;
}

export default function SidebarLink({
  child,
  userType,
  lang,
  onClick,
  startTransition,
  isPending
}: ISidebarLink) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive =
    pathname === "/" + userType && child.href === "/"
      ? "active"
      : pathname.endsWith(child.href)
        ? "active"
        : "";

  const [isTransitioning, startPush] = useTransition();

  const onPush = () => {
    startTransition(() => {
      startPush(() => {
        router.push(`/${userType}${child.href}`);
        onClick();
      });
    });
  };

  return (
    <button
      key={child.label}
      className={clsx(
        "dashboard__sidebar__content__group__links__link",
        isTransitioning ? "active" : "",
        isActive && !isPending ? "active" : ""
      )}
      onLoad={() => {
        router.prefetch(`/${userType}${child.href}`);
        child.preloadLink && preloadQuery(child.preloadLink);
      }}
      onClick={onPush}
    >
      {isTransitioning ? <Loader small /> : child.icon}
      {lang === "ar" ? child.labelAr : child.label}
    </button>
  );
}
