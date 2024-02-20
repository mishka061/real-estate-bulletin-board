import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messagesErrors } from "../messengers/messagesErrors.js";
import { messagesSusses } from "../messengers/messagesSuccess.js";

export async function getAnnouncementPage(req, res, usersdb, apartamentsdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { decoded, tokenIsPresent } = tokenInfo;
      let apartamentOne = await apartamentsdb.findOne({
        _id: new ObjectId(req.params.id),
      });
      if (
        apartamentOne.authorName !== decoded.name ||
        apartamentOne.authorSurname !== decoded.surname
      ) {
        let writeLetter = true;
        res.render("announcementPage", {
          apartamentOne: apartamentOne,
          name: decoded.name,
          surname: decoded.surname,
          writeLetter: writeLetter,
          tokenIsPresent: tokenIsPresent,
          login: decoded.login,
          title: messagesSusses.success.titleAnnouncementPage,
        });
      } else {
        res.render("announcementPage", {
          apartamentOne: apartamentOne,
          name: decoded.name,
          surname: decoded.surname,
          tokenIsPresent: tokenIsPresent,
          login: decoded.login,
          title: messagesSusses.success.titleAnnouncementPage,
        });
      }
    } else {
      let apartamentOne = await apartamentsdb.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.render("announcementPage", {
        apartamentOne: apartamentOne,
        title: messagesSusses.success.titleAnnouncementPage,
      });
    }
  } catch (err) {
    console.error(err, messagesErrors.errors.getAnnouncementPageError);
    res.redirect("/registration");
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

function addZero(num) {
  if (num >= 0 && num <= 9) {
    return "0" + num;
  } else {
    return num;
  }
}

export async function postAnnouncementPage(
  req,
  res,
  usersdb,
  apartamentsdb,
  messengerdb
) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { decoded, tokenIsPresent } = tokenInfo;
      let { realty, messenger, userId } = req.body;
      let userRecipient = await usersdb.findOne({ _id: new ObjectId(userId) });
      let date = new Date();
      let today =
        addZero(date.getDate()) +
        " " +
        days[date.getMonth()] +
        " " +
        addZero(date.getFullYear());
      let hours = date.getHours() + ":" + addZero(date.getMinutes());
      let author = {
        authorName: userRecipient.name,
        authorSurname: userRecipient.surname,
        authorId: userRecipient._id,
      };
      let message = {
        senderName: decoded.name,
        senderSurname: decoded.surname,
        hours: hours,
        text: messenger,
      };
      let form = {
        realty: realty,
        author: author,
        info: {
          user: [
            {
              senderName: decoded.name,
              senderSurname: decoded.surname,
              senderId: decoded.userId,
              recordId: new ObjectId(),
              date: [
                {
                  day: today,
                  messages: [message],
                },
              ],
            },
          ],
        },
      };
      let existingRecord = await messengerdb.findOne({
        "realty.realtyId": realty.realtyId,
      });

      if (existingRecord) {
        let userIndex = existingRecord.info.user.findIndex(
          (user) => user.senderId === decoded.userId
        );
        if (userIndex === -1) {
          await messengerdb.updateOne(
            {
              "realty.realtyId": realty.realtyId,
            },
            {
              $push: {
                "info.user": {
                  senderName: decoded.name,
                  senderSurname: decoded.surname,
                  senderId: decoded.userId,
                  recordId: new ObjectId(),
                  date: [
                    {
                      day: today,
                      messages: [message],
                    },
                  ],
                },
              },
            }
          );
        } else {
          let dayIndex = existingRecord.info.user[userIndex].date.findIndex(
            (day) => day.day === today
          );
          if (dayIndex === -1) {
            await messengerdb.updateOne(
              {
                "realty.realtyId": realty.realtyId,
                "info.user.senderId": decoded.userId,
              },
              {
                $push: {
                  "info.user.$[elem].date": {
                    day: today,
                    messages: [message],
                  },
                },
              },
              {
                arrayFilters: [{ "elem.senderId": decoded.userId }],
              }
            );
          } else {
            await messengerdb.updateOne(
              {
                "realty.realtyId": realty.realtyId,
                "info.user.senderId": decoded.userId,
                "info.user.date.day": today,
              },
              {
                $push: {
                  "info.user.$[elem].date.$[dayElem].messages": message,
                },
              },
              {
                arrayFilters: [
                  { "elem.senderId": decoded.userId },
                  { "dayElem.day": today },
                ],
              }
            );
          }
        }
      } else {
        await messengerdb.insertOne(form);
      }

      let id = req.params.id;

      res.redirect(`/apartaments/${id}`);
    } else {
      let apartamentOne = await apartamentsdb.findOne({
        _id: new ObjectId(req.params.id),
      });

      res.render("announcementPage", {
        apartamentOne: apartamentOne,
      });
    }
  } catch (err) {
    console.error(err, messagesErrors.errors.postAnnouncementPageError);
    res.redirect("/registration");
  }
}

