import { getTokenAndCookie } from "./token.js";
import { messagesErrors } from "../messengers/messagesErrors.js";
import { messagesSusses } from "../messengers/messagesSuccess.js";

export async function getProfile(req, res, usersdb, apartamentsdb) {;
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { decoded, tokenIsPresent} = tokenInfo;
      let apartmentsArr = await apartamentsdb.find({userId: decoded.userId}).toArray();
      res.render("profile", {
        apartmentsArr: apartmentsArr,
        tokenIsPresent: tokenIsPresent,
        name: decoded.name,
        surname: decoded.surname,
        title: messagesSusses.success.titleProfile,
      });
    } else {
      res.render("home", {
        apartmentsArr: apartmentsArr,
        title: messagesSusses.success.titleHome,
      });
    }
  } catch (err) {
    console.error(err, messagesErrors.errors.getProfileError);
    res.redirect("/registration");
  }
}




