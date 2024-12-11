import decodeJwt from "./decodeJwt";
import getCookieClient from "./getCookieClient";

const getUserClient = () => {
  const token = getCookieClient("token");

  if (!token) {
    throw new Error("Unauthorized");
  }

  const user = decodeJwt(token);

  return user;
};

export default getUserClient;
