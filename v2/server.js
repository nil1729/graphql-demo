const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema')
const cors = require('cors');
const path = require('path');

app.use(cors());


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// Serve Static assests in Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});