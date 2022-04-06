const User = require("../models/User");
const bcrypt = require("bcryptjs");


/**
 *  a new user
 * @param name
 * @param email
 * @param password
 * @returns {Promise<void>}
 */

const newUser = async ({name, email, password}) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let user = new User({
        name, email, password: hashedPassword
    });
    await user.save();

}
/**
 *
 * @param key
 * @param value
 * @returns {QueryWithHelpers<HydratedDocument<any, {}, {}> | null, HydratedDocument<any, {}, {}>, {}, any>}
 */
const findUser = (key, value) => {
    if (key === '_id') {
        return User.findById(value);
    }
    return User.findOne({[key]: value});
};

const findUsers = () => {
    return User.find();
};

const createNewUser = async ({name, email, password, roles, accountStatus}) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let user = new User({
        name, email, password: hashedPassword, roles: roles ? roles : ['USER'], accountStatus: accountStatus ? accountStatus : 'PENDING'
    });
    await user.save()
    return user
}
 const userDeleted = async (id) => {
   return  User.findByIdAndDelete(id);

}
const updateUser =  (id,data)=>{

   return User.findByIdAndUpdate(id,{...data},{new:true})
}


module.exports = {
    newUser, findUser, findUsers, createNewUser,userDeleted,updateUser
}