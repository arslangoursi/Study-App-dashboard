import axios from "axios";

const uploadFile = async (
  file: string | File | null
): Promise<string | null> => {
  if (!file) return null;
  if (typeof file === "string") return file;
  if (!(file instanceof File)) return null;

  try {
    const { data } = await axios.post(`/api/upload`, file, {
      params: { filename: encodeURIComponent(file.name.trim()) }
    });
    console.warn("File uploaded:", data.url);
    return data.url;
  } catch (error) {
    console.error("File upload failed:", error);
    return null;
  }
};

export default uploadFile;
