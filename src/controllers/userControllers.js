const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  try {
    //reading input
    let Body = req.body;
    let arr = Object.keys(Body); //array of object keys

    //empty request body
    if (arr.length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide input" });
    }

    //mandatory fields
    if (!Body.title) {
      {
        return res
          .status(400)
          .send({ status: false, message: "Please provide title" });
      }
    }
    if (!Body.name) {
      {
        return res
          .status(400)
          .send({ status: false, message: "Please provide name" });
      }
    }
    if (!Body.phone) {
      {
        return res
          .status(400)
          .send({ status: false, message: "Please provide phone" });
      }
    }
    if (!Body.email) {
      {
        return res
          .status(400)
          .send({ status: false, message: "Please provide email" });
      }
    }
    if (!Body.password) {
      {
        return res
          .status(400)
          .send({ status: false, message: "Please provide password" });
      }
    }

    if (Body.address) {
      if (!Body.address.street) {
        {
          return res
            .status(400)
            .send({ status: false, message: "Please provide street" });
        }
      }
      if (!Body.address.city) {
        {
          return res
            .status(400)
            .send({ status: false, message: "Please provide city" });
        }
      }
      if (!Body.address.pincode) {
        {
          return res
            .status(400)
            .send({ status: false, message: "Please provide pincode" });
        }
      }

      let pincode = /^[0-9]{6,6}$/.test(Body.address.pincode);

      if (!pincode) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide a valid pincode " });
      }
    }

    //title enum validation
    if (!["Mr", "Mrs", "Miss"].includes(Body.title)) {
      return res.status(400).send({
        status: false,
        message: "Title Must be of these values [Mr, Mrs, Miss] ",
      });
    }

    //format validation using regex
    let name = /^[a-zA-Z ]{2,30}$/.test(Body.name);
    let emailId = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(Body.email);
    let password =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(
        Body.password
      );
    let phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
      Body.phone
    );

    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid name " });
    }
    if (!emailId) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid emailId " });
    }
    if (!password) {
      return res.status(400).send({
        status: false,
        message:
          "Please provide a valid password - Password should include atleast one special character, one uppercase, one lowercase, one number and should be mimimum 8 character long",
      });
    }
    if (!phone) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid phone " });
    }

    //unique key validation
    let checkEmail = await userModel.findOne({ email: Body.email });
    if (checkEmail) {
      return res.status(400).send({
        status: false,
        message: `${Body.email} already exist use different email`,
      });
    }
    let checkPhone = await userModel.findOne({ phone: Body.phone });
    if (checkPhone) {
      return res.status(400).send({
        status: false,
        message: `${Body.phone} already exist use different phone number`,
      });
    }

    //create body
    let dataCreated = await userModel.create(Body);
    res
      .status(201)
      .send({ status: true, message: "success", data: dataCreated });
  } catch (error) {
    res.status(500).send({
      status: false,
      Error: "Server not responding",
      message: error.message,
    });
  }
};

const loginUser = async function (req, res) {
  try {
    //empty request body
    let Body = req.body;
    let arr = Object.keys(Body);
    // console.log(arr)
    // console.log(Body)
    // console.log(typeof(arr))
    // console.log(typeof(Body))

    if (arr.length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide login credential" });
    }

    //reading login credential
    let Email = req.body.email;
    let Password = req.body.password;

    //if email or password is missing
    if (!Email) {
      return res.status(400).send({ status: false, Error: "Please enter an email address." });
    }
    else if (!Password) {
      return res.status(400).send({ status: false, message: "Please enter Password." });
    }
    else {
      //fetch user with login credential
      let user = await userModel.findOne({ email: Email, password: Password });
      //no user found
      if (!user)
        return res.status(401).send({
          status: false,
          message: "Email or the Password is incorrect.",
        });

      //generate token
      let token = jwt.sign(
        {
          userId: user._id.toString(),
          iat: Math.floor(Date.now() / 1000),
          name: 'Krishna'

        },
        "krishnasahu",
        { expiresIn: "1h" } //expires in 1hr
      );
      res.setHeader("x-api-key", token,{new:true}); //send token in response headers
      res.status(200).send({ status: true, message: token }); //send token in response body
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      Error: "Server not responding",
      message: error.message,
    });
  }
};

//export functions
module.exports = { createUser, loginUser };
