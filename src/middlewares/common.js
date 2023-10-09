const bookModel = require("../models/bookModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: "Please pass token" });
    }

    //decode token
    try {
      const decodedToken = jwt.verify(token, "krishnasahu", {
        //ignoreExpiration: true,
      });
      //console.log(decodedToken.exp*1000);//*1000
      //console.log(Date.now());

      if (Date.now() > decodedToken.exp*1000) {//*1000
        return res
          .status(401)
          .send({ status: false, message: "session expired" });
      }

      req.decodedToken = decodedToken;
    } catch (error) {
      return res
        .status(401)
        .send({ status: false, message: "Authentication failed" });
    }
    console.log("authentication successful");
    next();
    // });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//Authorization
const authorization = async function (req, res, next) {
  try {
    const decodedToken = req.decodedToken;
    
     userId = decodedToken.userId;
   
     //bookId from params
    let  bookIdFromParams = req.params.bookId;

   


    if (bookIdFromParams) {
      //id format validation
      if (bookIdFromParams) {
        if (mongoose.Types.ObjectId.isValid(bookIdFromParams) == false) {
          return res
            .status(400)
            .send({ status: false, message: "Invalid bookId" });
        }
      }

      const book = await bookModel.findById({ _id: bookIdFromParams });
      
      let bookIdFromDB=book._id.toString();
       
      


      //no book found
      if (!book) {
        return res
          .status(404)
          .send({ status: false, message: "book not found" });
      }

      //check if user is authorized

      if (bookIdFromParams!= bookIdFromDB) {
        return res.status(401).send({ status: false, message: "Not authorised" });
      }

      console.log("authorization successful");

      next();
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { authentication, authorization };
