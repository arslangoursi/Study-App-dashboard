"use client";
import StillUploaderEntryButton from "./StillUploaderEntryButton";

export default function StillUploaderEntry({
  day,
  night,
  onChange,
  onRemove
}: {
  day: string | null;
  night: string | null;
  onChange: (e: any) => void;
  onRemove: () => void;
}) {
  return (
    <div className="create__user__section__stills__images__entry">
      <button
        type="button"
        onClick={onRemove}
        className="create__user__section__stills__images__entry__delete"
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
          className="feather feather-trash-2"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
      <StillUploaderEntryButton
        value={day}
        onChange={(e) => onChange({ day: e })}
      />
      <StillUploaderEntryButton
        value={night}
        onChange={(e) => onChange({ night: e })}
      />
    </div>
  );
}
