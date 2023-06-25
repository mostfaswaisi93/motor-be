const JWT = require("jsonwebtoken");
const { addNewUser } = require("./user");
const users = require("../Models/user");
const bcrypt = require("bcrypt");
const error = require("../Middleware/error");

exports.authenticationLogin = async (request, response, next) => {
  try {
    
    error(request, response, next);
    let data = await users.findOne({ email: (request.body.email).toLowerCase().trim()})
    
    if (!data) throw new Error("invalid user");
      if (bcrypt.compareSync((request.body.password).trim(), data.password)) {
        let token = JWT.sign(
          {
            email: (request.body.email).toLowerCase().trim(),
            isAdmin: data.isAdmin,
            id: data._id,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        const { password, ...others } = data._doc;
        response.status(200).json({
          message: `You Successfully logged in`,
          data: others,
          token,
        });
      } else {
        throw new Error("Email or password is incorrect");
      }
  } catch (err) {
    next(err);
  }
};

exports.authenticationRegister = (request, response, next) => {
  error(request, response, next);
  addNewUser(request, response, next);
};

exports.changepassword = async (request, response, next) => {
  try {
    error(request, response, next);
    if (request.id != request.body.id) throw new Error("Not Allowed")
      let data = await users.findOne({ _id: request.body.id });
      if (!data) throw new Error("invalid user");
        
      if (bcrypt.compareSync((request.body.password).trim(), data.password)) {
            data.password = bcrypt.hashSync((request.body.newPassword).trim(), 10)
            await data.save()
       
        const { password, ...others } = data._doc;
        response.status(200).json({ message: "password changed correctly", data: others});
            
      } else {
        throw new Error("Your Password isn't Correct");
      }      
  } catch (err) {
    next(err);
  }
};
