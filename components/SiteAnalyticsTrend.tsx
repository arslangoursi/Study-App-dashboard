export default function SiteAnalyticsTrend({
  type,
  percentage
}: {
  type: string | undefined;
  percentage: string;
}) {
  return (
    <div
      className={`site__analytics__stats__card__graph ${
        type === "up"
          ? "graph__up"
          : type === "down"
            ? "graph__down"
            : "graph_still"
      }`}
    >
      <div className="site__analytics__stats__card__graph__content">
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
          className="lucide lucide-move-up"
        >
          <path d="M8 6L12 2L16 6" />
          <path d="M12 2V22" />
        </svg>
        {percentage}
      </div>
    </div>
  );
}
