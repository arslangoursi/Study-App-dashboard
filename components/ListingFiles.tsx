export default function ListingFiles({ files }: { files: string[] }) {
  return (
    <div className="listing__page__table__content__row__entry">
      {files?.length === 0
        ? "No files"
        : files?.map((file) => (
            <a
              key={file}
              href={file}
              onClick={(e) => e.stopPropagation()}
              className="listing__page__table__content__row__entry__tag"
            >
              {file.split("/").pop()}
            </a>
          ))}
    </div>
  );
}
