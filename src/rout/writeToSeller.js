import { getTokenAndCookie } from "./token.js";
import { messagesErrors } from "../messengers/messagesErrors.js";
import { messagesSusses } from "../messengers/messagesSuccess.js";
import { ObjectId } from "mongodb";

export async function getWriteToSeller(req, res, usersdb, messengerdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (!tokenInfo) {
      return res.redirect("/home");
    }
    const { decoded, tokenIsPresent } = tokenInfo;
    const messengerArr = await messengerdb
      .find({ "author.authorId": new ObjectId(decoded.userId) })
      .toArray();
    res.render("messenger", {
      messengerArr: messengerArr,
      tokenIsPresent,
      name: decoded.name,
      surname: decoded.surname,
      title: messagesSusses.success.titleWriteToSeller,
    });
  } catch (err) {
    console.error(err, messagesErrors.errors.getWriteToSellerError);
    res.redirect("/registration");
  }
}

export async function postWriteToSeller(req, res, usersdb, messengerdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { decoded } = tokenInfo;
      const recordId = new ObjectId(req.body.recordId);
      const authorId = decoded.userId;
      const user = await messengerdb.findOne({
        "author.authorId": new ObjectId(authorId),
      });
      if (user) {
        await messengerdb.updateOne(
          { "author.authorId": new ObjectId(authorId) },
          { $pull: { "info.user": { recordId: recordId } } }
        );
      } else {
        console.error(messagesErrors.errors.userNotDefined);
      }
      res.redirect("/messenger");
    } else {
      res.redirect("/home");
    }
  } catch (err) {
    console.error(err, messagesErrors.errors.postWriteToSellerError);
    res.redirect("/registration");
  }
}
