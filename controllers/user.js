const {findUsers, findUser, newUser, createNewUser} = require("../services/user");

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 *
 * TODO: Sort,Filter,Pagination,Select
 */


const getUsers = async (req, res, next) => {
    try {
        const users = await findUsers();

        return res.status(200).json({
            status: "success",
            data: users,
            message: "Retrieved all users"
        });
    } catch (e) {
        next(e)
    }
}
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const getUser = async (req, res, next) => {
    try{
        const id = req.params.id;
        const user = await findUser('_id', id);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }
        return res.status(200).json({
            status: "success",
            data: user,
            message: "Retrieved user"
        });

    }catch (e) {
        next(e)
    }
}
const postUser =async (req,res,next) => {
try{
    const {name,email,password,roles,accountStatus} = req.body;
     const find = await findUser('email', email);
     if(find){
         return res.status(400).json({
             status: "fail",
             message: "User already exists"
         });
     }
    const user = await createNewUser({name,email,password,roles,accountStatus});
    if (!user) {
        return res.status(400).json({
            status: "fail",
            message: "User not Created"
        });
    }
    return res.status(201).json({
        status: "success",
        data: user,
        message: "Created user"
    });


}catch (e) {
    next(e)
}
}
const putUser = () => {

}
const patchUser = () => {

}
const deleteUser = () => {

}

module.exports = {
    getUsers,
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}