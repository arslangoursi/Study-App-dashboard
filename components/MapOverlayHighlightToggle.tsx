import colors from "@/data/mapColors.json";

export default function MapOverlayHighlightToggle({
  isHighlighted,
  setHighlighted
}: {
  isHighlighted: boolean;
  setHighlighted: (highlighted: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-label="highlight toggle"
      onClick={() => setHighlighted(!isHighlighted)}
      style={{
        backgroundColor: isHighlighted ? colors.AVAILABLE : colors.NO_DETAILS
      }}
      className="map__overlay__highlight__button"
    />
  );
}
