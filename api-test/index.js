const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema');
const { MongoDB } = require('./db/index');
var cors = require('cors')


MongoDB();
const app = express();
app.use(cors())

const port = 5000;
// middleware
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))


app.get('/', (req, res) => {
    res.send('First endpoint')
})

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})
