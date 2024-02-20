import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messagesErrors } from "../messengers/messagesErrors.js";
import { messagesSusses } from "../messengers/messagesSuccess.js";

export async function getEdit(req, res, usersdb, apartamentsdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
        const { decoded, tokenIsPresent} = tokenInfo;
      let apartamentOne = await apartamentsdb.findOne({_id: new ObjectId(req.params.id)} );
      res.render("edit", {
        apartamentOne: apartamentOne,
        tokenIsPresent: tokenIsPresent,
        id: req.params.id,
        name: decoded.name,
        surname: decoded.surname,
        title: messagesSusses.success.titleEdit,
      });
    } else {
      res.render("home", {
        apartamentOne: apartamentOne,
        title: messagesSusses.success.titleHome,
      });
    }
  } catch (err) {
    console.error(err, messagesErrors.errors.getEditError);
    res.redirect("/registration");
  }
}
export async function postEdit(req, res, usersdb, apartamentsdb) {
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
    const { tokenIsPresent, userId } = await getTokenAndCookie(
      req,
      usersdb
    );
    let user = await usersdb.findOne({
      _id: new ObjectId(userId),
      
    });
    if (user && tokenIsPresent) {
      let imgLabels = req.files["imgLabelEdit[]"].map((imgLabelEdit) => {
        return imgLabelEdit.originalname;
      });
      let images = req.files["imageEdit[]"].map((imageEdit) => {
        return imageEdit.originalname;
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
        login: user.login,
        userId: userId,
      };
      let id = req.params.id
      await apartamentsdb.updateOne({ _id: new ObjectId(id) },{$set:form});

      res.redirect("/profile");
    } else {
      res.render("home", {
        title: messagesSusses.success.titleAddAdvert,
      });
    }
   
  } catch (error) {
    console.error(messagesErrors.errors.postEditError, error);
    res.status(500).send('Internal Server Error');
  }
}