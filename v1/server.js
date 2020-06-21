const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();
const schema = require('./schema');

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));


const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log(`Server Started on port ${PORT}`)
});