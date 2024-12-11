import { jotaiStore, languageAtom } from "@/constants/state";

import axios from "axios";
import { toast } from "react-toastify";

export default function errorBlockClient(error: {
  response?: { status: number; data: any };
  request?: any;
}) {
  const language = jotaiStore.get(languageAtom);
  const isArabic = language === "ar";

  const getErrorMessage = (messageEn: string, messageAr: string) =>
    isArabic ? messageAr : messageEn;

  try {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { status, data } = error.response;
        toast.error(
          getErrorMessage(
            `Request failed with status ${status}: ${data}`,
            `فشل الطلب بالحالة ${status}: ${data}`
          )
        );
      } else if (error.request) {
        toast.error(
          getErrorMessage(
            "No response received from the server",
            "لم يتم استلام استجابة من الخادم"
          )
        );
      } else {
        toast.error(
          getErrorMessage(
            "Error occurred while setting up the request",
            "حدث خطأ أثناء إعداد الطلب"
          )
        );
      }
    } else {
      toast.error(
        getErrorMessage("An unexpected error occurred", "حدث خطأ غير متوقع")
      );
    }
  } catch {
    toast.error(
      getErrorMessage("An unexpected error occurred", "حدث خطأ غير متوقع")
    );
  }
}
