export default function ApartmentSvgUiDetailsView360({
  link
}: {
  link: string;
}) {
  return (
    <iframe
      loading="lazy"
      src={link}
      width="100%"
      height="100%"
      style={{ border: "none", minHeight: 400 }}
    />
  );
}
