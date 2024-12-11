import axios from "axios";

export default async function deewanMessageSender(
  text: string,
  recipients: string
) {
  try {
    const response = await axios.request({
      method: "POST",
      url: "https://apis.deewan.sa/sms/v1/messages",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.DEEWAN_API_KEY}`
      },
      data: {
        senderName: "ZOOD",
        messageType: "text",
        messageText: text,
        recipients: recipients
      }
    });
    console.warn(response.data);
  } catch (error) {
    console.error(error);
  }
}
