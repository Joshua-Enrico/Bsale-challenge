const { User } = require("../../models")
const { Pending } = require("../../models")
const { Mailing } = require("../mailing");
const CryptoJS = require("crypto-js");

/* Here we validate user existance and proper input, then we sent a email confirmation  */
async function RecoverVldtrs(email) {
    if (!email) {
        return { message: "Invalid Email", isValid: false };
    }
    const Exist = await User.findOne({ email });

    // validate email existance
    if (!Exist) {
        return { message: "Email not exist", isValid: false };
    }

    const ExistPending = await Pending.findOne({ UserId: Exist._id });
    // validate request existance
    if (ExistPending) {
        return { message: "Already Request have been sent , check your inbox", isValid: false };
    } else {
        const nesPending = new Pending({
            UserId: Exist._id,
            email: Exist.email,
            name: Exist.firstName
        })
        const SavedPending = await nesPending.save()
        if (!SavedPending) {
            return { message: "Error saving email", isValid: false };
        }
    }

    // send email
    const SendMail = await Mailing(Exist._id, Exist.email, Exist.firstName);
    if (SendMail.isValid == false) {
        return { message: SendMail.message, isValid: false };
    }

    return { message: SendMail.message, isValid: true };

}


async function ResetVldtr (id, password, confirmPassword) {

    if (!id) {
        return { message: "Invalid id", isValid: false };
    } else if (!password || !confirmPassword || password != confirmPassword) { 
        return { message: "Invalid password", isValid: false };
    }

    const Exist = await Pending.findOne({ UserId: id });

    if (!Exist) {
        return { message: "There is not Reset Password Request For this user", isValid: false };
    }

    const ExistUser = await User.findOne({ _id: id });
    if (!ExistUser) {
        return { message: "User not found", isValid: false };
    } 

    ExistUser.password = CryptoJS.AES.encrypt(password, process.env.PASSPHRASE).toString();
    const SaverPassword = await ExistUser.save()
    if (!SaverPassword) {
        return { message: "Error saving password", isValid: false };
    }

    Exist.remove();
    return { message: "Password Reset Successfully", isValid: true };


}


module.exports = {
    RecoverVldtrs,
    ResetVldtr,
}