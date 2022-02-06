const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const { create } = require("../models/User");

const UserType = new GraphQLObjectType({
    name: "UserType",
    description: "This is the user type",
    fields: {
        id: {
            type: GraphQLID,
        },
        username: {
            type: GraphQLString,
        },
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        role: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        createdAt: {
            type: GraphQLString,
        },
        updatedAt: {
            type: GraphQLString,
        }

    }

})



const LoginType = {
    name: "LoginType",
    description: "This is the login type",
    fields: {
        username: {
            type: GraphQLString,
        },
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        role: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        token: {
            type: GraphQLString,
        },
        id: {
            type: GraphQLID,
        }

    },



}

const UserExistance = {
    name: "UserExistance",
    description: "This is the login type",
    fields: {
        name: {
            type: GraphQLString,


        },
        id : {
            type: GraphQLID,
        }
    }
}

module.exports = {
        UserType,
        LoginType,
        UserExistance
    }