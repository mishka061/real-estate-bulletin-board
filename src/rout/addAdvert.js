import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messagesErrors } from "../messengers/messagesErrors.js";
import { messagesSusses } from "../messengers/messagesSuccess.js";

export async function getAddAdvert(req, res, usersdb, apartamentsdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    const { decoded, tokenIsPresent } = tokenInfo;
    if (decoded.userId) {
      let user = await usersdb.findOne({
        _id: new ObjectId(decoded.userId),
      });
      if (user && tokenIsPresent) {
        res.render("addAdvert", {
          tokenIsPresent: tokenIsPresent,
          name: decoded.name,
          surname: decoded.surname,
          title: messagesSusses.success.titleAddAdvert,
        });
      } else {
        res.render("home");
      }
    } else {
      res.render("home");
    }
  } catch (error) {
    console.error(messagesErrors.errors.getAddAdvertError, error);
  }
}

export async function postAddAdvert(req, res, usersdb, apartmentsdb) {
  try {
    let {
      sellButton,
      typeOfProperty,
      address,
      infoHouse,
      infoApartments,
      textDetail,
      hectare,
      price,
      amenitiesAndDetails,
    } = req.body;
    const { decoded, tokenIsPresent, userId } = await getTokenAndCookie(
      req,
      usersdb
    );
    let user = await usersdb.findOne({
      _id: new ObjectId(userId),
    });
    if (user && tokenIsPresent) {
      let imgLabels = req.files["imgLabel[]"].map((imgLabel) => {
        return imgLabel.originalname;
      });
      let images = req.files["image[]"].map((image) => {
        return image.originalname;
      });
      let form = {
        sellButton: sellButton,
        typeOfProperty: typeOfProperty,
        address: address,
        infoHouse: infoHouse,
        hectare: hectare,
        infoApartments: infoApartments,
        imgLabels: imgLabels,
        images: images,
        textDetail: textDetail,
        amenitiesAndDetails: amenitiesAndDetails,
        price: price,
        authorName: decoded.name,
        authorSurname: decoded.surname,
        userId: userId,
      };
      await apartmentsdb.insertOne(form);
      console.log(messagesSusses.success.successfulAddAdvert)
      res.render("addAdvert", {
        tokenIsPresent: tokenIsPresent,
        login: user.login,
        title: messagesSusses.success.titleAddAdvert,
      });
    } else {
      res.render("home", {
        title: messagesSusses.success.titleAddAdvert,
      });
    }
  } catch (error) {
    console.error(messagesErrors.errors.postAddAdvertError, error);
  }
} 
