import axios from "axios";

export default async function generateLog({
  module,
  action,
  user,
  url,
  oldData,
  newData
}: {
  module: "admin.projects.create";
  action: "create" | "update" | "delete";
  user: string;
  url: string;
  oldData?: any;
  newData?: any;
}) {
  await axios.post("/api/log", {
    userId: user,
    url,
    description: {
      en: "",
      ar: ""
    }
  });
}
