const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * @description Middleware to check if the user is authenticated
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 * @constructor
 */

async function Auth(req, res, next) {

   try{
       let token = req.headers.authorization;
       if (!token) {
           res.status(401).json({
               message: "Unauthorized"
           })
       }
       token = token.split(" ")[1];
       const Decode = jwt.verify(token, 'hash-key');

       const user = await User.findOne(Decode._id);
       if (!user) {
           res.status(401).json({
               message: "Unauthorized"
           })
       }

       req.user =  {
           id: user.id,
           name: user.name,
           email: user.email,
           roles: user.roles
       };

       next();
   }catch (e) {
       next(e);
   }

}

module.exports = Auth;