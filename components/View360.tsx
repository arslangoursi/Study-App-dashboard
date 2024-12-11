"use client";

import { useState } from "react";

const link =
  "https://cloud.chaos.com/collaboration/virtual-tour/Wp42prCrST5b26bHQJdqHt/present?n=VvSnJw4cKZkDjs3YKkaXyz";

export default function View360() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="map__overlay__detail__modal__image__overlay__right__gallery"
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
          className="feather feather-monitor"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </button>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "1vh",
            left: "1vw",
            width: "98vw",
            height: "98vh",
            zIndex: 1000,
            backgroundColor: "var(--white)",
            borderRadius: "1em",
            overflow: "hidden"
          }}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            style={{
              left: "1em",
              top: "1em",
              right: "auto"
            }}
            className="map__overlay__detail__modal__image__overlay__right__gallery__popup__close"
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
          <iframe
            loading="lazy"
            src={link}
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </div>
      )}
    </>
  );
}
