import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messagesErrors } from "../messengers/messagesErrors.js";
import { messagesSusses } from "../messengers/messagesSuccess.js";

export async function getDelete(req, res, usersdb, apartamentsdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const entryId = req.params.id;
      await apartamentsdb.deleteOne({ _id: new ObjectId(entryId) });
      res.redirect("/profile");
    } else {
      res.render("home", {
        apartmentsArr: apartmentsArr,
        title: messagesSusses.success.titleHome,
      });
    }
  } catch (err) {
    console.error(err, messagesErrors.errors.getDeleteError);
    res.redirect("/registration");
  }
}
