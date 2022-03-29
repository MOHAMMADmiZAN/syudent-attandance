const {registerService,loginService} = require("../services/auth");



/**
 * @description - This function is used to register a new user
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */

const registerController = async (req, res, next) => {
    try {


        const {name, email, password} = req.body

        // rulesMessage(req,res)
        const user = await registerService({name, email, password})

        return res.status(200).json({
            msg: "User registered successfully"
        });

    } catch (e) {
        next(e)
    }


}

/**
 * @description - This function is used to log in a user
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

const loginController = async (req, res, next) => {



    try {
        const {email, password} = req.body;
        const token = await loginService({email, password});
        if (token) {
            res.status(200).json({
                message: "Login successful",
                token
            });
        } else {
            res.status(401).json({
                message: "Invalid credentials",

            });
        }

    } catch (e) {
        next(e);
    }
}
module.exports = {
    registerController,
    loginController
}