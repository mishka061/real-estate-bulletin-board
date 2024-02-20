import jwt from "jsonwebtoken";
import { messagesErrors } from "../messengers/messagesErrors.js";
import { messagesSusses } from "../messengers/messagesSuccess.js";

let secretKey = "12345";
export default secretKey;

export async function getTokenAndCookie(req) {
  try {
    let tokenIsPresent = req.cookies.token ? true : false;
    let decoded, email, userId, login, name, surname;
    if (tokenIsPresent) {
      decoded = jwt.verify(req.cookies.token, secretKey);
      name = decoded.name;
      surname = decoded.surname;
      login = decoded.login;
      email = decoded.email;
      userId = decoded.userId;
      console.log(messagesSusses.success.successfulToken);
      return { decoded, email, tokenIsPresent, userId , name, surname};
    } else {
      console.error(messagesErrors.errors.tokenVerificationError);
    }
  } catch (error) {
    console.log(error, messagesErrors.errors.tokenAndCookieError);
  }
}
