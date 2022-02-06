const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

function generateToken(user) {
    const AccesToken  = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,
        {expiresIn: "3d"}
    )
    return AccesToken;
}

function ResetPasswordToken(id, name) {
    const token = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify({id: id, name: name}), process.env.PASSPHRASE ).toString());
   
    return token
}


module.exports = {
    generateToken,
    ResetPasswordToken,
}