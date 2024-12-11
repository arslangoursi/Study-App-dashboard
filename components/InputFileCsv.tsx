"use client";

import "@/styles/login.scss";

import { useRef, useState } from "react";

import CSVReader from "react-csv-reader";

interface IInput {
  label: string;
  id?: string;
  onChange: (json: any) => void;
}

export default function InputFileCsv({ label, id, onChange }: IInput) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="input__color__container__type__file__csv">
      <CSVReader
        onFileLoaded={(data, fileInfo) => {
          const headers = data[0];
          const rows = data.slice(1);
          const result = rows.map((row) =>
            headers.reduce(
              (acc: any, header: any, index: string | number) => ({
                ...acc,
                [header]: row[index]
              }),
              {}
            )
          );
          setFileName(fileInfo.name);
          onChange(result);
        }}
        ref={inputRef}
      />
      <div className="type__file__preview">
        {fileName ? (
          <div className="type__file__preview__name">
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
              className="feather feather-file"
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
            {fileName}
          </div>
        ) : (
          <div className="type__file__preview__add">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            <div className="type__file__preview__add__label">{label}</div>
          </div>
        )}
      </div>
    </div>
  );
}
