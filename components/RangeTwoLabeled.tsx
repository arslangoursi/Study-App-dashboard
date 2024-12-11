import { Range, getTrackBackground } from "react-range";

import CurrencyDisplay from "./CurrencyDisplay";
import AreaDisplay from "./AreaDisplay";
import { RangeTwoLabeledProps } from "@/interfaces";
import { memo } from "react";

function RangeTwoLabeled({
  values,
  setValues,
  min,
  max,
  type = "price"
}: RangeTwoLabeledProps) {
  if (!Array.isArray(values) || values.length !== 2) {
    return null;
  }

  if (values[0] === Infinity || values[1] === Infinity) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
      }}
    >
      <Range
        values={values}
        onChange={setValues}
        min={min}
        max={max}
        allowOverlap={true}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%"
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "var(--golden)", "#ccc"],
                  min: min,
                  max: max
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "10px",
              width: "10px",
              borderRadius: "5px",
              backgroundColor: "var(--blue)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "var(--shadow)"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-22px",
                color: "#fff",
                fontWeight: "bold",
                minWidth: "fit-content",
                fontSize: "12px",
                padding: "4px 10px",
                borderRadius: "8px",
                backgroundColor: "var(--goldenLight)",
                left:
                  index === 0
                    ? values[0] < (max - min) / 4
                      ? "-10px"
                      : values[0] < (max - min) / 2
                        ? "0"
                        : "auto"
                    : index === 1
                      ? values[1] > ((max - min) * 3) / 4
                        ? "auto"
                        : values[1] > (max - min) / 2
                          ? "0"
                          : "-10px"
                      : "auto",
                right:
                  index === 0
                    ? values[0] >= (max - min) / 4
                      ? values[0] < (max - min) / 2
                        ? "0"
                        : "-10px"
                      : "auto"
                    : index === 1
                      ? values[1] <= ((max - min) * 3) / 4
                        ? values[1] > (max - min) / 2
                          ? "0"
                          : "auto"
                        : "-10px"
                      : "auto",
                whiteSpace: "nowrap"
              }}
            >
              {type === "price" ? (
                <CurrencyDisplay>{values[index].toFixed(1)}</CurrencyDisplay>
              ) : type === "area" ? (
                <AreaDisplay>{values[index].toFixed(1)}</AreaDisplay>
              ) : null}
            </div>
            <div
              style={{
                height: "10px",
                width: "10px",
                borderRadius: "5px",
                backgroundColor: "var(--golden)"
              }}
            />
          </div>
        )}
      />
    </div>
  );
}

export default memo(RangeTwoLabeled);
