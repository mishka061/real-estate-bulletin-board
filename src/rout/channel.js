import { getTokenAndCookie } from "./token.js";
import { messagesErrors } from "../messengers/messagesErrors.js";
import { messagesSusses } from "../messengers/messagesSuccess.js";
import { ObjectId } from "mongodb";

export async function getChannel(req, res, usersdb, messengerdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { decoded, tokenIsPresent } = tokenInfo;
      let apartamentOne = await messengerdb.findOne({
        "info.user.recordId": new ObjectId(req.params.id),
      });
      let userText = await messengerdb.findOne({
        "info.user.recordId": new ObjectId(req.params.id),
      });
      const userTextEntry = userText.info.user.find(
        (entry) => entry.recordId.toString() === req.params.id
      );
      res.render("channel", {
        userTextEntry: userTextEntry,
        apartamentOne: apartamentOne,
        tokenIsPresent: tokenIsPresent,
        name: decoded.name,
        surname: decoded.surname,
        title: messagesSusses.success.titleChannel,
      });
    } else {
      res.redirect("/home");
    }
  } catch (err) {
    console.error(err, messagesErrors.errors.getChannelError);
    res.redirect("/registration");
  }
}

function addZero(num) {
  if (num >= 0 && num <= 9) {
    return "0" + num;
  } else {
    return num;
  }
}

let days = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export async function postChannel(
  req,
  res,
  usersdb,
  apartamentsdb,
  messengerdb
) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { decoded } = tokenInfo;
      let {messages } = req.body;
      let id = req.params.id;
      let date = new Date();
      let today =
        addZero(date.getDate()) +
        " " +
        days[date.getMonth()] +
        " " +
        addZero(date.getFullYear());

      let hours = date.getHours() + ":" + addZero(date.getMinutes());
      let userTextDate = await messengerdb.findOne({
        "info.user.recordId": new ObjectId(req.params.id),
      });
      const userDate = userTextDate.info.user.find(
        (entry) => entry.recordId.toString() === req.params.id
      );
      let iWritingMessage = {
        iWritingName: decoded.name,
        iWritingSurname: decoded.surname,
        text: messages.text,
        hours: hours,
      };
      let existingDayIndex = userDate.date.findIndex(
        (day) => day.day === today
      );
      if (existingDayIndex !== -1) {
        await messengerdb.updateOne(
          {
            "info.user.recordId": new ObjectId(req.params.id),
            "info.user.date.day": today,
          },
          {
            $push: {
              "info.user.$[elem].date.$[dayElem].messages": iWritingMessage,
            },
          },
          {
            arrayFilters: [
              { "elem.recordId": new ObjectId(req.params.id) },
              { "dayElem.day": today },
            ],
          }
        );
      } else {
        await messengerdb.updateOne(
          {
            "info.user.recordId": new ObjectId(req.params.id),
          },
          {
            $push: {
              "info.user.$.date": {
                day: today,
                messages: [iWritingMessage],
              },
            },
          }
        );
      }

      res.redirect(`/messenger/channel/${id}`);
    } else {
      let apartamentOne = await apartamentsdb.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.render("channel", {
        apartamentOne: apartamentOne,
        title: messagesSusses.success.titleChannel,
      });
    }
  } catch (err) {
    console.error(err, messagesErrors.errors.postChannelError);
    res.redirect("/registration");
  }
}































