import Template from "@/emails/template";
import deewanMessageSender from "@/utils/deewanMessageSender";
import sendEmail from "./resend";
import { MessageSenderParams } from "@/interfaces";

const sanitizeMessageText = (messageText: string): string => {
  return messageText
    .replace(/<a.*?href="(.*?)".*?>(.*?)<\/a>/g, "$1")
    .replace(/<button.*?action="(.*?)".*?>(.*?)<\/button>/g, "$1")
    .replace(/<.*?>/g, "");
};

const sendToPhone = async (messageText: string, phone: string) => {
  const sanitizedMessageText = sanitizeMessageText(messageText);
  await deewanMessageSender(sanitizedMessageText, phone);
};

const sendToEmail = async (params: MessageSenderParams) => {
  const { from, email, subject, messageText } = params;
  await sendEmail({
    from: from || "sales@zood.sa",
    to: email!,
    subject,
    react: Template({ content: messageText })
  });
};

const messageSender = async (params: MessageSenderParams) => {
  const { sendTo, phone, email } = params;

  if (sendTo === "none") return;

  const tasks: Promise<void>[] = [];

  if ((sendTo === "phone" || sendTo === "both") && phone) {
    tasks.push(sendToPhone(params.messageText, phone));
  }

  if ((sendTo === "email" || sendTo === "both") && email) {
    tasks.push(sendToEmail(params));
  }

  await Promise.all(tasks);
};

export default messageSender;
