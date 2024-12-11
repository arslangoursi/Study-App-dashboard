import { IEmail } from "@/interfaces";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function sendEmail(email: IEmail) {
  return await resend.emails.send(email).then((response) => {
    if (response.error) {
      console.error("Error sending email", response.error);
    }

    console.warn("Email sent successfully", response);

    return response;
  });
}
