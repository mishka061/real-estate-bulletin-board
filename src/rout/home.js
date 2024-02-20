import { getTokenAndCookie } from "./token.js";
import { messagesErrors } from "../messengers/messagesErrors.js";
import { messagesSusses } from "../messengers/messagesSuccess.js";

export async function getHome(req, res, usersdb, apartamentsdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { decoded, tokenIsPresent } = tokenInfo;
      let apartmentsArr = await apartamentsdb.find().toArray();
      res.render("home", {
        apartmentsArr: apartmentsArr,
        tokenIsPresent: tokenIsPresent,
        name: decoded.name,
        surname: decoded.surname,
        title: messagesSusses.success.titleHome,
      });
    } else {
      let apartmentsArr = await apartamentsdb.find().toArray();
      res.render("home", {
        apartmentsArr: apartmentsArr,
        title: messagesSusses.success.titleHome,
      });
    }
  } catch (err) {
    console.error(err, messagesErrors.errors.getHomeError);
    res.redirect("/registration");
  }
}

export async function postSearch(req, res, usersdb, apartamentsdb) {
  try {
      let {
        sellButton,
        typeOfProperty,
        searchNumberOfRooms,
        searchPriceMin,
        searchPriceMax,
        searchAdress,
      } = req.body;
      let apartmentsArr = await apartamentsdb.find().toArray();
      let priceMin = Number(searchPriceMin.replace(/\s/g, ""));
      let priceMax = Number(searchPriceMax.replace(/\s/g, ""));
      let subAddress;
      let cond = {
        $and: [
          { sellButton: sellButton },
          { typeOfProperty: typeOfProperty },
          { numberOfRooms: searchNumberOfRooms },
        ],
      };
      apartmentsArr.forEach((searchaddress) => {
        let addressArr = searchaddress.address.split(",");
        if (addressArr[0].trim() === searchAdress.trim()) {
          subAddress = searchAdress;
          cond.$and.push({ address: searchAdress });
        } 
      });
      let priceConditions = [];
      apartmentsArr.forEach((apartment) => {
        let price = apartment.price;
        for (let i = 0; i < price.length; i++) {
          if (price[i] === "") {
            continue;
          }
          let res = Number(price[i].replace(/\s/g, ""));
          if (res >= priceMin && res <= priceMax) {
            priceConditions.push({ price: price[i] });
          }
        }
      });

      if (priceConditions.length > 0) {
        cond.$and.push({ $or: priceConditions });
      }
      let apartament = await apartamentsdb.find(cond).toArray();
      res.render("home", {
        apartmentsArr: apartament,
        title: messagesSusses.success.titleHome,
      });

  } catch (err) {
    console.error(err, messagesErrors.errors.postSearchError);
    res.redirect("/registration");
  }
}
