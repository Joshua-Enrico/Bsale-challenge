const { GraphQLList, GraphQLString, GraphQLObjectType } = require("graphql");
const { UserType, UserExistance } = require("./typedef");
const { User, Pending } = require("../models");

const users = {
    type: new GraphQLList(UserType),
    description: 'This is the hello query',
    async resolve() {
        const users = User.find();
        return users;
    }
}

const PedingReq = {
    type: new GraphQLObjectType(UserExistance),
    description: "Validating a pending request for reset password",
    args: {
        UserId: { type: GraphQLString },
    },
    async resolve(_, args) {
        const { UserId } = args;
        if (!UserId) {
            throw new Error("UserId is required");
        }

        const pending = await Pending.findOne({ UserId });
        if (!pending) {
            throw new Error("UserId is not found");
        }

        return { id: pending.UserId, name: pending.name};


    }
}


module.exports = { users, PedingReq };