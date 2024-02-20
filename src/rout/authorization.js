import jwt from "jsonwebtoken";
import secretKey from "./token.js";
import { messagesErrors } from "../messengers/messagesErrors.js";
import { messagesSusses } from "../messengers/messagesSuccess.js";
import bcrypt from "bcrypt";

export async function getAuthorisation(req, res) {
  try {
    res.render("authorization", {
      layout: "registration",
      title: messagesSusses.success.titleAuthorisation,
    });
  } catch (error) {
    console.error(error, messagesErrors.errors.getAuthorisationError);
  }
}

export async function postAuthorisation(req, res, usersdb) {
  try {
    let {email, password } = req.body;
    if (req.body.submit) {
      let user = await usersdb.findOne({ email });

      if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          let token = jwt.sign(
            {
              name : user.name,
              surname : user.surname,
              login: user.login,
              email: user.email,
              password: user.password,
              userId: user._id,
            },
            secretKey,
            { expiresIn: "24h" }
          );
          res.cookie("token", token);
          console.log(messagesSusses.success.successfulAuthorization);
          res.redirect("/");
        } else {
          let errorAuthorization = messagesErrors.errors.emailEndLoginlNotFoundError;
          res.render("authorization", {
            layout: "registration",
            errorAuthorization: errorAuthorization,
          });
          console.error(messagesErrors.errors.authorizationError);
        }
      } else {
        let errorAuthorization = messagesErrors.errors.emailEndLoginlNotFoundError;
        res.render("authorization", {
          layout: "registration",
          errorAuthorization: errorAuthorization,
        });
        console.error(messagesErrors.errors.authorizationError);
      }
    } else {
      console.error(messagesErrors.errors.postRegistrationError);
    }
  } catch (err) {
    console.error(messagesErrors.errors.postAuthorizationError, err);
  }
}
