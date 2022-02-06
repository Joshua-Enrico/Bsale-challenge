
function validateRegisArgs(args) {
    if (!args.username || !args.password || !args.email || !args.firstName || !args.lastName || !args.role) {
        return { message: "Please Enter all arguments", isValid: false };
    } else {
        return {isValid: true };
    }
}

module.exports = {
    validateRegisArgs
}