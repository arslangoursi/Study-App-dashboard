import dayjs from "dayjs";

const exportToCSV = (data: Record<string, any>[], fileName: string) => {
  if (!data.length) return;

  const headers = Array.from(
    new Set(
      data.flatMap((row) =>
        Object.keys(row).flatMap((key) =>
          typeof row[key] === "object" && row[key] !== null
            ? Object.keys(row[key]).map((subKey) => `${key}_${subKey}`)
            : key
        )
      )
    )
  );

  const csvRows = data.map((row) =>
    headers
      .map((header) => {
        const [mainKey, subKey] = header.split("_");
        const value = subKey ? row[mainKey]?.[subKey] : row[mainKey];

        if (typeof value === "object" && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        } else {
          return `"${String(value || "").replace(/"/g, '""')}"`;
        }
      })
      .join(",")
  );

  const csvContent = `\uFEFF${headers.join(",")}\n${csvRows.join("\n")}`;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default exportToCSV;
