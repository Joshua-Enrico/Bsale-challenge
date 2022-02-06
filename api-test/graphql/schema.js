const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { users, PedingReq } = require('./querys');
const { register, login, recoverPassword, resetPassword } = require('./mutation');

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'This is the root query',
    fields: {
        users: users,
        resetValidate: PedingReq

    }
})



const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'This is the root mutation',
    fields: {
        register,
        login,
        recoverPassword,
        resetPassword
    }
})


const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})

module.exports  = schema;